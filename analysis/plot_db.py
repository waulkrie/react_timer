import pandas as pd
import matplotlib.pyplot as plt
import argparse

def process_and_graph_data(csv_file_path):
    # Load data from CSV
    df = pd.read_csv(csv_file_path)
    
    # Calculate deltas between consecutive timestamps
    df['Delta'] = df['Timestamp'].diff()
    
    # Calculate average delta and standard deviation
    average_delta = df['Delta'].mean()
    std_dev_delta = df['Delta'].std()
    
    print(f"Average Delta: {average_delta} ms")
    print(f"Standard Deviation of Delta: {std_dev_delta} ms")
    
    # Plotting
    plt.figure(figsize=(10, 6))
    plt.plot(df['Timestamp'], df['Value'], label='DB Level', marker='o', linestyle='-', markersize=2)
    plt.plot(df['Timestamp'], df['Delta'], label='Delta', marker='o', linestyle='-', markersize=1)
    plt.xlabel('Timestamp (ms)')
    plt.ylabel('DB Level')
    plt.title('DB Level vs. Timestamp')

    # Display average delta and standard deviation on the plot
    text_str = f'Average Delta: {average_delta:.2f} ms\nStandard Deviation: {std_dev_delta:.2f} ms'
    plt.text(0.05, 0.85, text_str, transform=plt.gca().transAxes, fontsize=9, verticalalignment='top')
    
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()

# Example usage
# csv_file_path = 'path_to_your_sanitized_csv_file.csv'  # Update this path to your CSV file
# process_and_graph_data(csv_file_path)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Process and graph log data from a CSV file.')
    parser.add_argument('csv_file_path', type=str, help='Path to the CSV file containing log data.')
    
    args = parser.parse_args()
    
    process_and_graph_data(args.csv_file_path)