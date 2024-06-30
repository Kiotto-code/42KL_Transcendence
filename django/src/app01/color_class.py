class TerminalColors:
    RED = '\033[91m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    MAGENTA = '\033[95m'
    CYAN = '\033[96m'
    RESET = '\033[0m'  # Reset terminal color

# Example dictionary mapping names to colors
name_colors = {
    'Alice': TerminalColors.RED,
    'Bob': TerminalColors.GREEN,
    'Charlie': TerminalColors.BLUE,
    'David': TerminalColors.MAGENTA,
    'Eve': TerminalColors.CYAN,
}