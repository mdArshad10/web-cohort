// Problem statement
// You are designing a simple robot system. Each robot has a name and a batteryLevel. The robot should have a method charge() that increases the battery level by 20, but it cannot exceed 100.

// Challenge
// • Implement a constructor function Robot that initializes name and batteryLevel.
// • Attach a method charge() to its prototype that increases batteryLevel by 20, ensuring it does not go above 100.

function Robot(name, batteryLevel) {
  this.name = name;
  this.batteryLevel = batteryLevel;
}

Robot.prototype.charge = function () {
  if (this.batteryLevel < 100) {
    this.batteryLevel = Math.min(this.batteryLevel + 20, 100);
  }
};

const robot = new Robot("Chiti the Robot", 90);
console.log(robot.batteryLevel);
robot.charge();
robot.charge();
robot.charge();
robot.charge();
console.log(robot.batteryLevel);
