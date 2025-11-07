
package com.mysite.sbb;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/")
    public String root() {
        // http://localhost:8080/ 접속 → /question/list 로 리다이렉트
        return "redirect:/question/list";
    }
}
