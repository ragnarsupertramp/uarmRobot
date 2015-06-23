#include <Servo.h>

int incomingByte = 0;
int led = 13;
int x = 0;

Servo servoRot;
Servo servoL;
Servo servoR;

void Servoatch() {
  servoRot.attach(11);
  servoL.attach(12);
  servoR.attach(13);
}
void Serovdetach() {
  servoRot.detach();
  servoL.detach();
  servoR.detach();
}
void setup() {
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  selector(100);
}
int delaytime = 50;
void loop() {

  if (Serial.available()) {
    Servoatch();
    int incomingByte = Serial.read();
    Serial.print("I received: ");
    Serial.println(incomingByte);
    if (incomingByte == 48) {
      //0
      //arduino 48
      selector(0);
      delay(delaytime);
    }
    if (incomingByte == 49) {
      //1
      //arduino 49
      selector(1);
      delay(delaytime);
    }
    if (incomingByte == 50) {
      //2
      //arduino 50
      selector(2);
      delay(delaytime);
    }
    if (incomingByte == 51) {
      //3
      //arduino 51
      selector(3);
      delay(delaytime);
    }
    if (incomingByte == 52) {
      //4
      //arduino 52
      selector(4);
      delay(delaytime);
    }
    if (incomingByte == 53) {
      //5
      //arduino 53
      selector(5);
      delay(delaytime);
    }
    if (incomingByte == 54) {
      //6
      //arduino 54
      selector(6);
      delay(delaytime);
    }
    if (incomingByte == 55) {
      //7
      //arduino 55
      selector(7);
      delay(delaytime);
    }
    if (incomingByte == 56) {
      //8
      //arduino 56
      selector(8);
      delay(delaytime);
    }
    if (incomingByte == 57) {
      //9
      // arduino 57
      selector(9);
      delay(delaytime);
    }
    if (incomingByte == 58) {
      //. to :
      // arduino 46
      selector(20);
      delay(delaytime);
    }
    if (incomingByte == 98) {
      //backspace
      //arduino 112
      selector(21);
      delay(delaytime);
    }
  }
}
void armpos(int rot, int servoLeft, int servoRight ) {
  //write top var's to servo's white animation
  servoL.write(servoLeft + 30);
  servoR.write(servoRight - 20);
  servoRot.write(rot);
  delay(500);
  servoR.write(servoRight);
  servoL.write(servoLeft);
  delay(225);
}

void armposB(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoL.write(servoLeft + 20);
  servoR.write(servoRight - 20);
  servoRot.write(rot);
  delay(500);
  servoL.write(servoLeft);
  servoR.write(servoRight);
  delay(225);
}
void armposHA(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoL.write(servoLeft);
  servoRot.write(rot);
  delay(50);
  servoL.write(servoLeft + 25);
  servoR.write(servoRight - 5);
  delay(175);
}
void armposHB(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoR.write(servoRight - 40);
  servoRot.write(rot);
  delay(50);
  servoL.write(servoLeft + 25);
  servoR.write(servoRight - 5);
  delay(175);
}


void selector(int val) {
  switch (val) {
    case 1:
      armpos(114, 32, 130);
      armposHA(114, 35, 115);
      break;
    case 2:
      armpos(103, 38, 140);
      armposHA(103, 42, 125);
      break;
    case 3:
      armpos(92, 45, 140);
      armposHA(92, 45, 125);
      break;
    case 4:
      armpos(78, 46, 140);
      armposHA(78, 46, 125);
      break;
    case 5:
      armpos(66, 40, 145);
      armposHA(66, 40, 130);
      break;
    case 6:
      armpos(56, 32, 140);
      armposHA(56, 38, 125);
      break;
    case 7:
      armposB(45, 52, 150);
      armposHB(45, 52, 135);
      break;
    case 8:
      armposB(58, 60, 157);
      armposHB(58, 60, 147);
      break;
    case 9:
      armposB(75, 60, 160);
      armposHB(75, 60, 145);
      break;
    case 0:
      armposB(95, 60, 160);
      armposHB(95, 60, 145);
      break;
    case 20:
      //dubblepunt;
      armposB(110, 64, 150);
      armposHB(110, 64, 135);
      break;
    case 21:
      //backspace
      armposB(125, 55, 145);
      armposHB(125, 55, 130);
      break;
    case 100:
      //home center
      armposB(90, 89, 142);
      armposHB(90, 89, 132);
      break;
    default:
      break;
  }
}


