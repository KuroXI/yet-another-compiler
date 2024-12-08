export const patterns = {
	KEYWORD: /^(int|String|double|boolean|char)$/,
	/**
	 * [a-zA-Z_]    - first letter
	 * [a-zA-Z0-9_] - second to last letter
	 */
	IDENTIFIER: /^[a-zA-Z_][a-zA-Z0-9_]*$/,
	/**
	 * ^-?[0-9]+$       - Int Value (Positive and Negative)
	 * ^".*"$           - String value
	 * ^(true|false)$   - Boolean value
	 * ^'[^']'$         - Char value
	 * ^-?\d+\.\d+$     - Double value (Positive and Negative)
	 */
	VALUE: /^-?[0-9]+$|^".*"$|^(true|false)$|^'[^']'$|^-?\d+\.\d+$/,
	OPERATOR: /^=$/,
	SEMICOLON: /^;$/,
};
