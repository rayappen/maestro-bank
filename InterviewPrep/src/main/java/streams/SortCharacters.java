package streams;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class SortCharacters {


    public static void main(String[] args) {
        List<String> list = new ArrayList<>(List.of("orange", "apple"));
        System.out.println(list.stream()
                .map(str -> str.chars()
                        .sorted()
                        .mapToObj(c -> String.valueOf((char) c))
                        .collect(Collectors.joining()))
                .toList());
        myApproach(list);

    }

    private static void myApproach(List<String> list){
        List<String> strList= new ArrayList<>();
        for(String str : list) {
            int[] alphabet = new int[26];
            for(int i = 0; i < str.length(); i++){
                alphabet[str.charAt(i) - 'a']++;
            }

            StringBuilder sb = new StringBuilder();
            for(int j = 0; j < alphabet.length; j++) {
                while(alphabet[j] > 0){
                    sb.append((char) ('a' + j));
                    alphabet[j]--;
                }
            }
            strList.add(sb.toString());
        }

        System.out.println(strList);
    }
}
