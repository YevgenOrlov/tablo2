#include <MD_Parola.h>
#include <MD_MAX72XX.h>
#include <SPI.h>

#define HARDWARE_TYPE MD_MAX72XX::FC16_HW
#define MAX_DEVICES 4  
#define CLK_PIN  9    
#define DATA_PIN 11    
#define CS_PIN   10    

MD_Parola P = MD_Parola(HARDWARE_TYPE, DATA_PIN, CLK_PIN, CS_PIN, MAX_DEVICES);

String inputData = ""; // Буфер для принятой строки

void setup() {
    Serial.begin(9600);  
    P.begin();
    P.setIntensity(5);
    P.displayClear();
    P.setSpeed(50);
    P.setPause(1000);

    P.displayText("start", PA_CENTER, 50, 1000, PA_SCROLL_LEFT);
    P.displayAnimate(); 
    Serial.println("HC-05 & MAX7219 Ready...");
}

void loop() {
    while (Serial.available()) {  
        char c = Serial.read();   
        Serial.print("["); Serial.print(c); Serial.println("]");  

        if (c == '\n' || c == '\r') {  
            inputData.trim();  
            if (inputData.length() > 0) {
                Serial.println("Полная строка: " + inputData); 
                processInput(inputData);  
            }
            inputData = "";  
        } else {
            inputData += c;  
        }
    }

    P.displayAnimate(); // Принудительно обновляем дисплей
}

void processInput(String data) {
  Serial.println("Обрабатываем: " + data);

  String tokens[5];  // 5 частей: счёт, имя, середина, счёт, имя
  int tokenIndex = 0;
  String temp = "";

  for (int i = 0; i < data.length(); i++) {
    char c = data.charAt(i);
    if (c == '|') {
      if (tokenIndex < 5) {
        tokens[tokenIndex++] = temp;
        temp = "";
      }
    } else {
      temp += c;
    }
  }
  if (tokenIndex < 5) {
    tokens[tokenIndex] = temp;
  }

  // Отладка
  Serial.println("Полученные данные:");
  for (int i = 0; i < 5; i++) {
    Serial.print(i);
    Serial.print(": ");
    Serial.println(tokens[i]);
  }

  // Формируем текст для матрицы
  String outputText = tokens[0] + " " + tokens[1] + " VS " + tokens[3] + " " + tokens[4];
  Serial.println("Вывод на матрицу: " + outputText);

  P.displayClear();
  delay(200);  // Короткая пауза

  P.displayText(outputText.c_str(), PA_CENTER, 50, 1000, PA_SCROLL_LEFT);
  P.displayAnimate();