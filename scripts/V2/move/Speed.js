script.description = "Speed hack using the strafe method, with AutoJump and air-tick limiter.";
script.allowBind = true;
script.allowHold = true;

const speed = new DoubleSetting(
    script,
    "Speed",
    "Horizontal movement speed in blocks per tick.",
    0.5, 0.1, 2.0, 0.05
);

const onlyGround = new BooleanSetting(
    script,
    "OnlyGround",
    "Only apply speed while on the ground.",
    false
);

const autoJump = new BooleanSetting(
    script,
    "AutoJump",
    "Automatically jump while moving and on the ground.",
    true
);

const limitAir = new BooleanSetting(
    script,
    "LimitAirStrafe",
    "Stop strafing after a number of airborne ticks until you land again.",
    true
);

const maxAirTicks = new IntSetting(
    script,
    "MaxAirTicks",
    "Maximum airborne ticks before strafing is suspended.",
    10, 1, 40, 1
);
maxAirTicks.visible(() => limitAir.getValue());

const DEG2RAD = Math.PI / 180.0;
const JUMP_MOTION = 0.42;

let airTicks = 0;

script.addListener("PreMotionEvent", (event) => {
    if (mc.player == null) return;

    // Track airborne ticks.
    if (mc.player.onGround) {
        airTicks = 0;
    } else {
        airTicks++;
    }

    const forward = event.forward;
    const strafe = event.strafe;
    const moving = forward !== 0 || strafe !== 0;

    // AutoJump: only when actually trying to move and grounded.
    if (autoJump.getValue() && moving && mc.player.onGround) {
        mc.player.motionY = JUMP_MOTION;
    }

    if (!moving) return;
    if (onlyGround.getValue() && !mc.player.onGround) return;
    if (limitAir.getValue() && !mc.player.onGround && airTicks > maxAirTicks.getValue()) return;

    let yaw = mc.player.rotationYaw;

    if (forward < 0) yaw += 180;
    const forwardSign = forward > 0 ? 1 : (forward < 0 ? -1 : 0);

    if (strafe !== 0) {
        if (forward === 0) {
            yaw += strafe > 0 ? -90 : 90;
        } else {
            yaw += (strafe > 0 ? -45 : 45) * forwardSign;
        }
    }

    const rad = yaw * DEG2RAD;
    const s = speed.getValue();

    mc.player.motionX = -Math.sin(rad) * s;
    mc.player.motionZ =  Math.cos(rad) * s;
});

script.addListener("WorldChangedEvent", () => {
    airTicks = 0;
});
