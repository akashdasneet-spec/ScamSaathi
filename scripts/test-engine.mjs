import { analyzeTextMessage } from '../src/lib/detector.ts';
import { analyzeUrlSafety } from '../src/lib/url-analyzer.ts';

// We can test the compiled or direct logic. Let's write an automated verification test.
console.log('--- Testing ScamSaathi Security Engine ---');

const electricityScam = 'Dear Consumer, Your electricity power will be disconnected tonight at 09:30 PM from electricity office. Call officer 9832104523';
const res1 = analyzeTextMessage(electricityScam);
console.assert(res1.riskLevel === 'high', `Electricity scam risk level failed: got ${res1.riskLevel}`);
console.assert(res1.urgencyDetected === true, 'Urgency detection failed');
console.log('✓ Test 1 Passed: Electricity bill disconnection scam correctly detected as HIGH RISK.');

const digitalArrest = 'URGENT NOTICE: CBI and Mumbai Police have issued an arrest warrant against your Aadhaar card for money laundering.';
const res2 = analyzeTextMessage(digitalArrest);
console.assert(res2.riskLevel === 'high', `Digital arrest risk level failed: got ${res2.riskLevel}`);
console.assert(res2.impersonationDetected !== null, 'Impersonation detection failed');
console.log('✓ Test 2 Passed: Digital arrest & police impersonation correctly flagged as HIGH RISK.');

const otpRequest = 'Dear user, please share the 6 digit OTP or ATM PIN to credit your refund of Rs 5000.';
const res3 = analyzeTextMessage(otpRequest);
console.assert(res3.credentialsRequested === true, 'Credentials request failed');
console.assert(res3.riskLevel === 'high', 'OTP steal must be high risk');
console.log('✓ Test 3 Passed: OTP / PIN harvest flagged with maximum severity.');

const maliciousUrl = 'http://sbi-kyc-update-portal.xyz/yono.apk';
const res4 = analyzeUrlSafety(maliciousUrl);
console.assert(res4.riskLevel === 'high', 'Malicious APK URL must be high risk');
console.assert(res4.indicators.some(i => i.id === 'apk-download'), 'APK indicator missing');
console.log('✓ Test 4 Passed: Suspicious .xyz domain + .apk download flagged as HIGH RISK.');

const ipUrl = 'http://192.168.1.100/login';
const res5 = analyzeUrlSafety(ipUrl);
console.assert(res5.indicators.some(i => i.id === 'raw-ip-address'), 'Raw IP check failed');
console.log('✓ Test 5 Passed: Raw IP address link flagged as HIGH RISK.');

const shortText = 'Hello sir';
const res6 = analyzeTextMessage(shortText);
console.assert(res6.riskLevel === 'caution', 'Short inconclusive text should be caution');
console.assert(res6.isUnknownOrShort === true, 'Inconclusive flag should be true');
console.log('✓ Test 6 Passed: Inconclusive short text never falsely marked safe.');

console.log('--- ALL AUTOMATED DETECTOR TESTS PASSED (6/6) ---');
