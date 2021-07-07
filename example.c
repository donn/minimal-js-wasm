#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char* add_two_strings(const char* a, const char* b) {
    int first = atoi(a);
    int second = atoi(b);
    int result = first + second;

    int len = snprintf(NULL, 0, "%i", result);
    char *str = malloc(len + 1);
    snprintf(str, len + 1, "%i", result);
    return str;
}