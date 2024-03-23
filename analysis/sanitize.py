import pandas as pd

def sanitize_log_file(input_file_path, output_file_path):
    # Open the input log file and read the lines
    with open(input_file_path, 'r') as file:
        lines = file.readlines()

    # Process lines to remove the "LOG" prefix and strip whitespace
    processed_lines = [line.replace('LOG', '').strip() for line in lines]
    processed_lines = [line.replace('INFO', '').strip() for line in lines]

    # Split each line into timestamp and value, then create a DataFrame
    data = [line.split(',') for line in processed_lines]
    df = pd.DataFrame(data, columns=['Timestamp', 'Value'])

    # Convert Timestamp column to numeric (optional, based on your needs)
    # df['Timestamp'] = pd.to_numeric(df['Timestamp'], errors='coerce')
    df['Value'] = pd.to_numeric(df['Value'], errors='coerce')

    # Save the cleaned data to a new CSV file
    df.to_csv(output_file_path, index=False)

# Example usage
input_file_path = 'log5DB_pino.txt'
output_file_path = 'log5DB_pino.csv'
sanitize_log_file(input_file_path, output_file_path)
