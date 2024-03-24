import pandas as pd
import matplotlib.pyplot as plt
import argparse
#chat gpt helped create this ancillary code

def sanitize_log_file(input_file_path, output_file_path):
    """
    Reads a log file, removes certain prefixes, and splits the content into timestamp and value.
    The cleaned data is then saved to a new CSV file.
    """
    with open(input_file_path, 'r') as file:
        lines = file.readlines()

    # Process lines to remove "LOG" and "INFO" prefixes and strip whitespace
    processed_lines = [line.replace('LOG', '').strip() for line in lines]
    processed_lines = [line.replace('INFO', '').strip() for line in processed_lines]

    # Split each line into timestamp and value, then create a DataFrame
    data = [line.split(',') for line in processed_lines]
    df = pd.DataFrame(data, columns=['Timestamp', 'Value'])

    # Convert columns to appropriate types
    df['Timestamp'] = pd.to_numeric(df['Timestamp'], errors='coerce')
    df['Value'] = pd.to_numeric(df['Value'], errors='coerce')

    # Save the cleaned data to a CSV file
    df.to_csv(output_file_path, index=False)

def process_and_graph_data(csv_file_path):
    """
    Loads data from a CSV file, calculates deltas, average delta, and standard deviation,
    and then graphs the DB level and deltas over time.
    """
    df = pd.read_csv(csv_file_path)
    df['Delta'] = df['Timestamp'].diff()
    average_delta = df['Delta'].mean()
    std_dev_delta = df['Delta'].std()

    print(f"Average Delta: {average_delta} ms")
    print(f"Standard Deviation of Delta: {std_dev_delta} ms")

    plt.figure(figsize=(10, 6))
    plt.plot(df['Timestamp'], df['Value'], label='DB Level', marker='o', linestyle='-', markersize=2)
    plt.plot(df['Timestamp'], df['Delta'], label='Delta', marker='o', linestyle='-', markersize=1)
    plt.xlabel('Timestamp (ms)')
    plt.ylabel('DB Level')
    plt.title('DB Level vs. Timestamp')
    text_str = f'Average Delta: {average_delta:.2f} ms\nStandard Deviation: {std_dev_delta:.2f} ms'
    plt.text(0.05, 0.85, text_str, transform=plt.gca().transAxes, fontsize=9, verticalalignment='top')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Sanitize, process, and graph log data from a log file.')
    parser.add_argument('input_file_path', type=str, help='Path to the log file to be sanitized and processed.')
    parser.add_argument('--output_csv_path', type=str, default='sanitized_data.csv', help='Path where the sanitized CSV file will be saved. Default is "sanitized_data.csv".')
    
    args = parser.parse_args()
    
    sanitize_log_file(args.input_file_path, args.output_csv_path)
    process_and_graph_data(args.output_csv_path)
