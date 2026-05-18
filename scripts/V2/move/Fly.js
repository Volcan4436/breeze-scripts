script.description = "Vanilla-style fly: strafe horizontally, jump = up, sneak = down, otherwise hover.";
script.allowBind = true;
script.allowHold = true;

const hSpeed = new DoubleSetting(
    script,
    "HorizontalSpeed",
    "Horizontal movement speed in blocks per tick.",
    0.5, 0.0, 2.0, 0.05
);

const vSpeed = new DoubleSetting(
    script,
    "VerticalSpeed",
    "Vertical movement speed (up/down) in blocks per tick.",
    0.5, 0.0, 2.0, 0.05
);

const cancelFall = new BooleanSetting(
    script,
    "CancelFallDistance",
    "Reset fallDistance every tick to avoid taking fall damage.",
    true
);

const DEG2RAD = Math.PI / 180.0;

function isJumpDown() {
    const kb = mc.gameSettings && mc.gameSettings.keyBindJump;
    if (!kb) return false;
    // Prefer real keyboard state so we don't react to other modules' spoofing.
    return typeof kb.getRealState === "function" ? kb.getRealState() : kb.keyDown;
}

function isSneakDown() {
    const kb = mc.gameSettings && mc.gameSettings.keyBindSneak;
    if (!kb) return false;
    return typeof kb.getRealState === "function" ? kb.getRealState() : kb.keyDown;
}

script.addListener("PreMotionEvent", (event) => {
    if (mc.player == null) return;

    // Vertical control.
    const up = isJumpDown();
    const down = isSneakDown();
    const v = vSpeed.getValue();

    if (up && !down) {
        mc.player.motionY = v;
    } else if (down && !up) {
        mc.player.motionY = -v;
    } else {
        mc.player.motionY = 0;
    }

    if (cancelFall.getValue()) {
        mc.player.fallDistance = 0;
    }

    // Horizontal strafe (mirrors Speed.js logic).
    const forward = event.forward;
    const strafe = event.strafe;
    const moving = forward !== 0 || strafe !== 0;

    if (!moving) {
        mc.player.motionX = 0;
        mc.player.motionZ = 0;
        return;
    }

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
    const s = hSpeed.getValue();

    mc.player.motionX = -Math.sin(rad) * s;
    mc.player.motionZ =  Math.cos(rad) * s;
});
