"""
Test script for ECE MATLAB Practical Helper
Tests the complete workflow with sample topics
"""

import sys
import os

# Add backend to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from agents.ece_matlab_agent import ECEMatlabAgent

def test_ece_agent():
    """Test the ECE MATLAB agent with sample topics"""
    
    print("=" * 80)
    print("ECE MATLAB PRACTICAL HELPER - TEST SCRIPT")
    print("=" * 80)
    
    # Initialize agent
    print("\n[1/3] Initializing ECE MATLAB Agent...")
    agent = ECEMatlabAgent()
    print("✓ Agent initialized successfully")
    
    # Test topics
    test_topics = [
        "Convolution of two signals",
        # "Fast Fourier Transform (FFT)",  # Uncomment to test more
    ]
    
    for idx, topic in enumerate(test_topics, start=1):
        print(f"\n[{idx+1}/3] Testing topic: '{topic}'")
        print("-" * 80)
        
        try:
            result = agent.process_practical(topic)
            
            if result["status"] == "success":
                print(f"✓ Theory generated: {len(result['theory'])} characters")
                print(f"✓ Brute-force code generated: {len(result['brute_force_code'])} characters")
                print(f"✓ Code explanation generated: {len(result['brute_force_explanation'])} characters")
                
                if result["optimization_applicable"]:
                    print(f"✓ Efficient code generated: {len(result['efficient_code'])} characters")
                    print(f"✓ Optimization explanation generated: {len(result['efficient_explanation'])} characters")
                else:
                    print("○ No significant optimization applicable")
                
                print(f"✓ LaTeX report generated: {len(result['latex_report'])} characters")
                print("\n✓✓✓ TEST PASSED ✓✓✓")
                
                # Optional: Print first 200 chars of each section
                print("\n--- Sample Output ---")
                print(f"Theory (first 200 chars):\n{result['theory'][:200]}...")
                print(f"\nBrute-force code (first 200 chars):\n{result['brute_force_code'][:200]}...")
                
            else:
                print(f"✗ TEST FAILED: {result.get('error_message', 'Unknown error')}")
                
        except Exception as e:
            print(f"✗ TEST FAILED with exception: {str(e)}")
    
    print("\n" + "=" * 80)
    print("TEST SUITE COMPLETE")
    print("=" * 80)

if __name__ == "__main__":
    # Check for API key
    if not os.getenv("GEMINI_API_KEY"):
        print("ERROR: GEMINI_API_KEY not found in environment variables")
        print("Please set it in your .env file")
        sys.exit(1)
    
    test_ece_agent()
