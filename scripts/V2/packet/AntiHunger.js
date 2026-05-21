script.description = "Cancels sprint packets to reduce hunger drain.";
script.allowBind = true;
script.allowHold = true;

script.addListener("PacketSendEvent", (event) => {
    const packet = event.packet;
    if (!(packet instanceof C0BPacketEntityAction)) return;

    const action = packet.getAction();
    if (action === "START_SPRINTING" || action === "STOP_SPRINTING") {
        event.cancel();
    }
});
