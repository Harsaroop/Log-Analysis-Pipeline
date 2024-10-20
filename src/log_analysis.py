import json
from collections import Counter
import random

def generate_mock_logs(num_logs=1000):
    log_levels = ['INFO', 'WARNING', 'ERROR']
    messages = [
        'Application started',
        'User login successful',
        'Database query executed',
        'API request received',
        'File upload completed',
        'Cache cleared',
        'Email sent',
        'Payment processed',
        'High CPU usage detected',
        'Low memory warning',
        'Network latency increased',
        'Database connection failed',
        'API rate limit exceeded',
        'Invalid user input',
        'Authentication failed'
    ]
    
    logs = []
    for i in range(num_logs):
        timestamp = f"2023-04-{random.randint(1, 30):02d} {random.randint(0, 23):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d}"
        level = random.choices(log_levels, weights=[0.7, 0.2, 0.1])[0]
        message = random.choice(messages)
        logs.append({'timestamp': timestamp, 'level': level, 'message': message})
    
    return logs

def analyze_logs(logs):
    # Count log levels
    level_counts = Counter(log['level'] for log in logs)
    
    # Identify potential anomalies (simplified)
    anomalies = [
        log for log in logs
        if log['level'] in ['WARNING', 'ERROR'] or 'failed' in log['message'].lower()
    ]
    
    return {
        'level_distribution': dict(level_counts),
        'anomalies': anomalies[:5]  # Return top 5 anomalies
    }

def main():
    # Generate mock logs
    logs = generate_mock_logs()
    
    # Analyze logs
    analysis_results = analyze_logs(logs)
    
    # Print results
    print("Log Level Distribution:")
    print(json.dumps(analysis_results['level_distribution'], indent=2))
    
    print("\nTop 5 Potential Anomalies:")
    for anomaly in analysis_results['anomalies']:
        print(f"{anomaly['timestamp']} - {anomaly['level']}: {anomaly['message']}")

if __name__ == "__main__":
    main()