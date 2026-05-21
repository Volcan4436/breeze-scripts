script.description = "Attempts to Reduce/Negate Fall Damage";
script.allowBind = true;
script.allowHold = true;

script.addListener("PacketSendEvent", (event) => {
    const packet = event.packet;
    if (!(packet instanceof C03PacketPlayer)) return;
    packet.setOnGround(true); // todo: Add Some NoFall Bypass Methods
});
