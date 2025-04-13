# 🏸 Табло для Бадминтона

Мобильное приложение на **React Native** с интеграцией через **Bluetooth (HC-05)** для управления табло на **MAX7219** (Arduino Nano).

## 📱 Мобильное приложение

### Возможности:
- Ввод имён игроков
- Счётчик очков для каждого игрока
- Передача данных на Arduino
- Анимация бегущей строки на табло

### Формат отправки строки:
**Пример:** `7|Иван|VS|9|Оля`
[левый счёт]|[имя слева]|VS|[правый счёт]|[имя справа]
---

## 🔌 Arduino-схема

**Оборудование:**
- Arduino Nano
- HC-05 Bluetooth
- MAX7219 LED Matrix (8x32)

**Библиотеки:**
- [MD_Parola](https://github.com/MajicDesigns/MD_Parola)
- [MD_MAX72XX](https://github.com/MajicDesigns/MD_MAX72XX)
- SPI

Arduino-скетч находится в папке:
/arduino/sketch_tablo.ino

---

## ⚙️ Установка и запуск

### 1. Установить зависимости:

```bash
npm install

2. Запустить приложение:
npx expo start
3. Загрузить Arduino-скетч через Arduino IDE
📡 Подключение Bluetooth
Подключить HC-05 к Arduino Nano:

TX → RX

RX → TX

VCC → 5V

GND → GND

Сопряжение по PIN-коду (обычно 1234 или 0000)

В приложении нажать "Сканировать устройства" → выбрать HC-05
 Структура проекта
 tablo2/
├── components/
│   ├── Counter.tsx
│   └── NameInput.tsx
├── arduino/
│   └── sketch_tablo.ino
├── App.tsx
├── README.md
└── ...
