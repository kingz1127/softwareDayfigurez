import React, { useState, useRef } from 'react';
// import userStore from './userStore';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import userStore from '../userStore';

export default function ForgotPasswordForm({ navigation }) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('email'); // 'email' | 'pin' | 'reset'
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [generatedPin, setGeneratedPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const pinRefs = useRef([]);

  const validateEmail = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendResetLink = () => {
    if (validateEmail()) {
      if (!userStore.emailExists(email)) {
        setErrors({ email: 'No account found with this email address.' });
        return;
      }
      const generated = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedPin(generated);
      console.log('Generated PIN (simulated SMS/email):', generated);
      setStep('pin');
      Alert.alert(
        'PIN Sent',
        `A 6-digit PIN has been sent to ${email}\n\n(Demo PIN: ${generated})`,
      );
    }
  };

  const handlePinChange = (text, index) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);
    if (errors.pin) setErrors({ ...errors, pin: null });

    // Auto-focus next input
    if (text && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyPin = () => {
    const enteredPin = pin.join('');
    if (enteredPin.length < 6) {
      setErrors({ pin: 'Please enter the complete 6-digit PIN' });
      return;
    }
    if (enteredPin !== generatedPin) {
      setErrors({ pin: 'Incorrect PIN. Please try again.' });
      return;
    }
    setErrors({});
    setStep('reset');
  };

  const handleResetPassword = () => {
    let newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    userStore.updatePassword(email, newPassword);
    Alert.alert('Success', 'Your password has been reset successfully!', [
      { text: 'Sign In', onPress: () => navigation.navigate('Login') }
    ]);
  };

  // ── Step 1: Email ──────────────────────────────────────────────
  const renderEmailStep = () => (
    <>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address and we'll send you a 6-digit PIN to reset your password.
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: null });
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSendResetLink}>
        <Text style={styles.primaryButtonText}>Send PIN</Text>
      </TouchableOpacity>
    </>
  );

  // ── Step 2: PIN Verification ───────────────────────────────────
  const renderPinStep = () => (
    <>
      <Text style={styles.title}>Enter PIN</Text>
      <Text style={styles.subtitle}>
        We sent a 6-digit PIN to{' '}
        <Text style={styles.emailHighlight}>{email}</Text>. Enter it below.
      </Text>

      <View style={styles.pinRow}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (pinRefs.current[index] = ref)}
            style={[styles.pinBox, errors.pin && styles.inputError]}
            value={digit}
            onChangeText={(text) => handlePinChange(text.slice(-1), index)}
            onKeyPress={(e) => handlePinKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
          />
        ))}
      </View>
      {errors.pin && <Text style={[styles.errorText, { textAlign: 'center', marginBottom: 10 }]}>{errors.pin}</Text>}

      <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyPin}>
        <Text style={styles.primaryButtonText}>Verify PIN</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resendContainer} onPress={handleSendResetLink}>
        <Text style={styles.resendText}>Didn't receive it? <Text style={styles.resendLink}>Resend PIN</Text></Text>
      </TouchableOpacity>
    </>
  );

  // ── Step 3: New Password ───────────────────────────────────────
  const renderResetStep = () => (
    <>
      <Text style={styles.title}>New Password</Text>
      <Text style={styles.subtitle}>Create a strong new password for your account.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.newPassword && styles.inputError]}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            if (errors.newPassword) setErrors({ ...errors, newPassword: null });
          }}
        />
        {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></Text>
        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null });
          }}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleResetPassword}>
        <Text style={styles.primaryButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </>
  );

  // ── Step indicator ─────────────────────────────────────────────
  const steps = ['email', 'pin', 'reset'];
  const currentStepIndex = steps.indexOf(step);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (step === 'email') navigation.goBack();
            else if (step === 'pin') setStep('email');
            else if (step === 'reset') setStep('pin');
          }}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        {/* Step Dots */}
        <View style={styles.stepIndicator}>
          {steps.map((s, i) => (
            <View
              key={s}
              style={[
                styles.stepDot,
                i <= currentStepIndex && styles.stepDotActive,
              ]}
            />
          ))}
        </View>

        {step === 'email' && renderEmailStep()}
        {step === 'pin' && renderPinStep()}
        {step === 'reset' && renderResetStep()}

        <View style={styles.helpContainer}>
          <Text style={styles.helpText}>Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.helpLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: '500',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 30,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  stepDotActive: {
    backgroundColor: '#2ecc71',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    lineHeight: 22,
  },
  emailHighlight: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputError: {
    borderColor: 'red',
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  pinBox: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  primaryButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  resendText: {
    color: '#666',
    fontSize: 15,
  },
  resendLink: {
    color: '#2ecc71',
    fontWeight: '600',
  },
  helpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  helpText: {
    color: '#666',
    fontSize: 16,
  },
  helpLink: {
    color: '#2ecc71',
    fontSize: 16,
    fontWeight: '600',
  },
});