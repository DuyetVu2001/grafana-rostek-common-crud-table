// valid () {} []
// example: valid("()[]{}") => true
// example: valid("(])") => false

bool valid(char *s) {
    int len = strlen(s);
    int i = 0;
    int j = 0;
    int stack[len];

    while (i < len) {
        if (s[i] == '(' || s[i] == '[' || s[i] == '{') {
            stack[j++] = s[i];
        } else {
            if (j == 0) {
                return false;
            }
            if (s[i] == ')' && stack[j - 1] != '(') {
                return false;
            }
            if (s[i] == ']' && stack[j - 1] != '[') {
                return false;
            }
            if (s[i] == '}' && stack[j - 1] != '{') {
                return false;
            }
            j--;
        }
        i++;
    }
    return j == 0;
}

printf("%d\n", valid("()[]{}"));