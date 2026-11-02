package codex;

import java.util.Scanner;

public class codex {

    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            System.out.print("Enter some text: ");
            String input = scanner.nextLine();
            System.out.println("You entered: " + input);
        }
    }
}
