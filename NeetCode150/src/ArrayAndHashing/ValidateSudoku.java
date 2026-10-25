package ArrayAndHashing;

import java.util.*;

public class ValidateSudoku {

    public static boolean isValidSudoku(char[][] board) {

        Map<Integer, Set<Character>> boxMap = new HashMap<>();
        Map<Integer, Set<Character>> colMap = new HashMap<>();

        for (int row = 0; row < board.length; row++) {
            Set<Character> rowSet = new HashSet<>();
            for (int col = 0; col < board[row].length; col++) {
                if ('.' != board[row][col]) {
                    if (!rowSet.add(board[row][col])) {
                        return false;
                    }
                    if (!colMap.computeIfAbsent(col, key -> new HashSet<>()).add(board[row][col])) {
                        return false;
                    }
                    if (!boxMap.computeIfAbsent((row / 3) * 3 + (col / 3), key -> new HashSet<>()).add(board[row][col])) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public boolean isValidSudokuOne(char[][] board) {

        List<Set<Character>> collist = new ArrayList<>();
        List<Set<Character>> boxList = new ArrayList<>();

        for (int i = 0; i < 9; i++) {
            collist.add(new HashSet<>());
            boxList.add(new HashSet<>());
        }

        for (int row = 0; row < board.length; row++) {
            Set<Character> rowSet = new HashSet<>();
            for (int col = 0; col < board[row].length; col++) {
                char val = board[row][col];

                if (val == '.')
                    continue;

                if (!rowSet.add(val))
                    return false;

                if (!collist.get(col).add(val))
                    return false;

                if (!boxList.get((row / 3) * 3 + (col / 3)).add(val))
                    return false;
            }
        }

        return true;
    }

    public static void main(String[] args) {

        char[][] sudoku = {{'1', '2', '.', '.', '3', '.', '.', '.', '.'},
                {'4', '.', '.', '5', '.', '.', '.', '.', '.'},
                {'.', '9', '8', '.', '.', '.', '.', '.', '3'},
                {'5', '.', '.', '.', '6', '.', '.', '.', '4'},
                {'.', '.', '.', '8', '.', '3', '.', '.', '5'},
                {'7', '.', '.', '.', '2', '.', '.', '.', '6'},
                {'.', '.', '.', '.', '.', '.', '2', '.', '.'},
                {'.', '.', '.', '4', '1', '9', '.', '.', '8'},
                {'.', '.', '.', '.', '8', '.', '.', '7', '9'}};

    }

}
