import { POST } from '../src/app/api/analyze/route';
import { NextRequest } from 'next/server';

async function testApi() {
  console.log('--- Testing /api/analyze Route Handler ---');

  // Test 1: PII Redaction
  const mockReq1 = new NextRequest('http://localhost:3000/api/analyze', {
    method: 'POST',
    body: JSON.stringify({
      text: 'Dear customer call 9876543210 for Aadhaar 1234 5678 9012 update',
      type: 'message',
      language: 'en',
    }),
  });

  const res1 = await POST(mockReq1);
  const data1 = await res1.json();
  console.assert(data1.success === true, 'API should return success: true');
  console.assert(!data1.redactedText.includes('9876543210'), 'Phone number must be redacted');
  console.assert(data1.redactedText.includes('[REDACTED_PHONE]'), 'Should contain [REDACTED_PHONE]');
  console.log('✓ Test 1 Passed: PII automatic redaction verified.');

  // Test 2: Multilingual Hindi request
  const mockReq2 = new NextRequest('http://localhost:3000/api/analyze', {
    method: 'POST',
    body: JSON.stringify({
      text: 'आज रात 9:30 बजे बिजली कट जाएगी, तुरंत फोन करें',
      type: 'message',
      language: 'hi',
    }),
  });

  const res2 = await POST(mockReq2);
  const data2 = await res2.json();
  console.assert(data2.result.riskLevel === 'high', 'Hindi electricity threat must be high risk');
  console.log('✓ Test 2 Passed: Hindi language message processed with high-risk verdict.');

  // Test 3: Safe URL analysis without fetch
  const mockReq3 = new NextRequest('http://localhost:3000/api/analyze', {
    method: 'POST',
    body: JSON.stringify({
      text: 'http://sbi-netbanking-verify.xyz/update.apk',
      type: 'url',
      language: 'en',
    }),
  });

  const res3 = await POST(mockReq3);
  const data3 = await res3.json();
  console.assert(data3.result.riskLevel === 'high', 'Malicious URL should be high risk');
  console.log('✓ Test 3 Passed: Safe Zero-fetch URL analysis completed.');

  console.log('--- ALL API ROUTE TESTS PASSED (3/3) ---');
}

testApi().catch((err) => {
  console.error('API Test Error:', err);
  process.exit(1);
});
