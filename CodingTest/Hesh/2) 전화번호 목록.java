import java.util.*;
class Solution {
    public boolean solution(String[] p) {
        Map<String, Integer> map = new HashMap<>();
        
        for(int i=0; i<p.length; i++){
            map.put(p[i], i);
        }
        
        for(int i=0; i<p.length; i++){
            for(int j=0; j<p[i].length(); j++){
                if(map.containsKey(p[i].substring(0,j))){
                    return false;
                }
            }
        }
    return true;
    }
}