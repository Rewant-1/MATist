"""
Quick test to verify the complete practical workflow
"""

import requests
import json

# Test the chat API with a complete practical request
url = "http://localhost:5000/api/chat"

test_messages = [
    {
        "role": "user",
        "content": "Generate complete practical for amplitude modulation"
    }
]

print("Testing complete practical request...")
print(f"Request: {test_messages[0]['content']}")
print("\nSending request to backend...")

try:
    response = requests.post(url, json={"messages": test_messages})
    result = response.json()
    
    print("\n" + "="*80)
    print("RESPONSE:")
    print("="*80)
    
    print(f"\nAgent: {result.get('agent', 'Unknown')}")
    print(f"Reason: {result.get('reason', 'N/A')}")
    
    if 'ece_data' in result:
        print("\n✅ ECE DATA FOUND!")
        ece_data = result['ece_data']
        print(f"   Status: {ece_data.get('status')}")
        print(f"   Topic: {ece_data.get('topic')}")
        print(f"   Has Theory: {'✓' if ece_data.get('theory') else '✗'}")
        print(f"   Has Brute-Force Code: {'✓' if ece_data.get('brute_force_code') else '✗'}")
        print(f"   Has Code Explanation: {'✓' if ece_data.get('brute_force_explanation') else '✗'}")
        print(f"   Has Efficient Code: {'✓' if ece_data.get('efficient_code') else '✗'}")
        print(f"   Has LaTeX Report: {'✓' if ece_data.get('latex_report') else '✗'}")
        print(f"   Optimization Applicable: {ece_data.get('optimization_applicable', False)}")
    else:
        print("\n❌ NO ECE DATA - Only got simple response")
        print(f"\nResponse preview (first 500 chars):")
        print(result.get('response', result.get('message', 'No response'))[:500])

except Exception as e:
    print(f"\n❌ Error: {e}")

print("\n" + "="*80)
