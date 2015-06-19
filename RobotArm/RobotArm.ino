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
  delay(325);
  servoR.write(servoRight);
  servoL.write(servoLeft);
  delay(225);
}

void armposB(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoL.write(servoLeft + 20);
  servoR.write(servoRight - 20);
  servoRot.write(rot);
  delay(325);
  servoL.write(servoLeft);
  servoR.write(servoRight);
  delay(225);
}
void armposHA(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoL.write(servoLeft);
  servoRot.write(rot);
  delay(50);
  servoL.write(servoLeft + 20);
  servoR.write(servoRight - 5);
  delay(175);
}
void armposHB(int rot, int servoLeft, int servoRight ) {
  //write bottom var's to servo's white animation
  servoR.write(servoRight - 40);
  servoRot.write(rot);
  delay(50);
  servoL.write(servoLeft + 20);
  servoR.write(servoRight - 5);
  delay(175);
}


void selector(int val) {
  switch (val) {
    case 1:
      armpos(114, 56, 119);
      armposHA(114, 55, 112);
      break;
    case 2:
      armpos(102, 56, 128);
      armposHA(102, 56, 115);
      break;
    case 3:
      armpos(90, 60, 130);
      armposHA(90, 60, 120);
      break;
    case 4:
      armpos(77, 60, 130);
      armposHA(77, 60, 120);
      break;
    case 5:
      armpos(64, 57, 127);
      armposHA(64, 57, 117);
      break;
    case 6:
      armpos(54, 53, 119);
      armposHA(54, 53, 109);
      break;
    case 7:
      armposB(36, 65, 141);
      armposHB(36, 65, 131);
      break;
    case 8:
      armposB(51, 70, 153);
      armposHB(51, 70, 143);
      break;
    case 9:
      armposB(71, 68, 155);
      armposHB(71, 68, 145);
      break;
    case 0:
      armposB(92, 68, 155);
      armposHB(92, 68, 145);
      break;
    case 20:
      //dubblepunt;
      armposB(115, 63, 151);
      armposHB(115, 63, 141);
      break;
    case 21:
      //backspace
      armposB(120, 63, 142);
      armposHB(120, 63, 132);
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


