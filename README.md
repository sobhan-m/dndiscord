# Description

Rolly is a Discord Bot designed to roll dice in Discord channels.

## Formatting

The text input in the channel must be of the form:
`/r 1d6+1d4`
or
`/roll 1d6+1d4`
with only one space after the command word and no spaces between the dice rolls.

## Terminology

-   **Message:** `/r 1d20:a+1d4+6`
-   **Command:** `/r`
-   **Argument:** `1d20:a+1d4+6`
-   **Roll:** `1d20:a`
-   **Operator:** `+`
-   **Constant:** `6`
-   **Dice Number:** `1` in `1d20:a`
-   **Dice Type:** `d20` in `1d20:a`
-   **Option:** `:a` in `1d20:a`
