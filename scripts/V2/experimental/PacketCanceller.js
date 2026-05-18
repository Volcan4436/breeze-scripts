// PacketCanceller: per-packet toggles with per-packet sub-options.
// Uses instanceof checks against the globally-exposed packet classes (same
// pattern as AntiHunger.js).

script.description = "Cancels individual packets with optional per-packet filters.";
script.allowBind = true;
script.allowHold = true;

// ---------------------------------------------------------------------------
// Outgoing (client -> server)
// ---------------------------------------------------------------------------

// C00 KeepAlive
const cC00 = new BooleanSetting(script, "C00PacketKeepAlive", "Cancel client keep-alive packets.", false);

// C01 ChatMessage
const cC01 = new BooleanSetting(script, "C01PacketChatMessage", "Cancel outgoing chat messages.", false);

// C02 UseEntity
const cC02 = new BooleanSetting(script, "C02PacketUseEntity", "Cancel entity interactions.", false);
const cC02_ATTACK      = new BooleanSetting(script, "C02_ATTACK",      "Cancel ATTACK actions.",      true);
const cC02_INTERACT    = new BooleanSetting(script, "C02_INTERACT",    "Cancel INTERACT actions.",    true);
const cC02_INTERACT_AT = new BooleanSetting(script, "C02_INTERACT_AT", "Cancel INTERACT_AT actions.", true);
cC02_ATTACK.visible(() => cC02.getValue());
cC02_INTERACT.visible(() => cC02.getValue());
cC02_INTERACT_AT.visible(() => cC02.getValue());

// C03 Player (base only - no subclass)
const cC03 = new BooleanSetting(script, "C03PacketPlayer", "Cancel base C03 player packets (no pos/look).", false);
// C04 Player.Position
const cC04 = new BooleanSetting(script, "C04PacketPlayerPosition", "Cancel position-only updates.", false);
// C05 Player.Look
const cC05 = new BooleanSetting(script, "C05PacketPlayerLook", "Cancel rotation-only updates.", false);
// C06 Player.PositionLook
const cC06 = new BooleanSetting(script, "C06PacketPlayerPosLook", "Cancel position+rotation updates.", false);

// C07 PlayerDigging
const cC07 = new BooleanSetting(script, "C07PacketPlayerDigging", "Cancel digging packets.", false);
const cC07_START   = new BooleanSetting(script, "C07_START_DESTROY_BLOCK", "Cancel START_DESTROY_BLOCK.", true);
const cC07_ABORT   = new BooleanSetting(script, "C07_ABORT_DESTROY_BLOCK", "Cancel ABORT_DESTROY_BLOCK.", true);
const cC07_STOP    = new BooleanSetting(script, "C07_STOP_DESTROY_BLOCK",  "Cancel STOP_DESTROY_BLOCK.",  true);
const cC07_DROPALL = new BooleanSetting(script, "C07_DROP_ALL_ITEMS",      "Cancel DROP_ALL_ITEMS.",      true);
const cC07_DROP    = new BooleanSetting(script, "C07_DROP_ITEM",           "Cancel DROP_ITEM.",           true);
const cC07_RELEASE = new BooleanSetting(script, "C07_RELEASE_USE_ITEM",    "Cancel RELEASE_USE_ITEM.",    true);
cC07_START.visible(() => cC07.getValue());
cC07_ABORT.visible(() => cC07.getValue());
cC07_STOP.visible(() => cC07.getValue());
cC07_DROPALL.visible(() => cC07.getValue());
cC07_DROP.visible(() => cC07.getValue());
cC07_RELEASE.visible(() => cC07.getValue());

// C08 BlockPlacement
const cC08 = new BooleanSetting(script, "C08PacketBlockPlacement", "Cancel block placements / right-click item use.", false);

// C09 HeldItemChange
const cC09 = new BooleanSetting(script, "C09PacketHeldItemChange", "Cancel held-item slot changes.", false);

// C0A Animation (swing arm)
const cC0A = new BooleanSetting(script, "C0APacketAnimation", "Cancel arm-swing animation.", false);

// C0B EntityAction
const cC0B = new BooleanSetting(script, "C0BPacketEntityAction", "Cancel entity-action packets.", false);
const cC0B_StartSneak   = new BooleanSetting(script, "C0B_START_SNEAKING",   "Cancel START_SNEAKING.",   true);
const cC0B_StopSneak    = new BooleanSetting(script, "C0B_STOP_SNEAKING",    "Cancel STOP_SNEAKING.",    true);
const cC0B_StartSprint  = new BooleanSetting(script, "C0B_START_SPRINTING",  "Cancel START_SPRINTING.",  true);
const cC0B_StopSprint   = new BooleanSetting(script, "C0B_STOP_SPRINTING",   "Cancel STOP_SPRINTING.",   true);
const cC0B_StopSleep    = new BooleanSetting(script, "C0B_STOP_SLEEPING",    "Cancel STOP_SLEEPING.",    true);
const cC0B_RidingJump   = new BooleanSetting(script, "C0B_RIDING_JUMP",      "Cancel RIDING_JUMP.",      true);
const cC0B_OpenInv      = new BooleanSetting(script, "C0B_OPEN_INVENTORY",   "Cancel OPEN_INVENTORY.",   true);
cC0B_StartSneak.visible(() => cC0B.getValue());
cC0B_StopSneak.visible(() => cC0B.getValue());
cC0B_StartSprint.visible(() => cC0B.getValue());
cC0B_StopSprint.visible(() => cC0B.getValue());
cC0B_StopSleep.visible(() => cC0B.getValue());
cC0B_RidingJump.visible(() => cC0B.getValue());
cC0B_OpenInv.visible(() => cC0B.getValue());

// C0C Input
const cC0C = new BooleanSetting(script, "C0CPacketInput", "Cancel input/steer packets.", false);

// C0D CloseWindow
const cC0D = new BooleanSetting(script, "C0DPacketCloseWindow", "Cancel close-window packets.", false);

// C0E ClickWindow
const cC0E = new BooleanSetting(script, "C0EPacketClickWindow", "Cancel inventory clicks.", false);

// C0F ConfirmTransaction
const cC0F = new BooleanSetting(script, "C0FPacketConfirmTransaction", "Cancel transaction confirmations.", false);

// C17 CustomPayload
const cC17 = new BooleanSetting(script, "C17PacketCustomPayload", "Cancel client custom payloads.", false);

// ---------------------------------------------------------------------------
// Incoming (server -> client)
// ---------------------------------------------------------------------------

const sS00 = new BooleanSetting(script, "S00PacketKeepAlive",         "Cancel server keep-alive packets.",  false);
const sS01 = new BooleanSetting(script, "S01PacketJoinGame",          "Cancel join-game packet.",           false);
const sS02 = new BooleanSetting(script, "S02PacketChat",              "Cancel incoming chat messages.",     false);
const sS03 = new BooleanSetting(script, "S03PacketTimeUpdate",        "Cancel time-of-day updates.",        false);
const sS04 = new BooleanSetting(script, "S04PacketEntityEquipment",   "Cancel entity equipment updates.",   false);
const sS05 = new BooleanSetting(script, "S05PacketSpawnPosition",     "Cancel world spawn position.",       false);
const sS06 = new BooleanSetting(script, "S06PacketUpdateHealth",      "Cancel health updates.",             false);
const sS07 = new BooleanSetting(script, "S07PacketRespawn",           "Cancel respawn packets.",            false);
const sS08 = new BooleanSetting(script, "S08PacketPlayerPosLook",     "Cancel server position resets.",     false);
const sS09 = new BooleanSetting(script, "S09PacketHeldItemChange",    "Cancel held-item changes (server).", false);
const sS0C = new BooleanSetting(script, "S0CPacketSpawnPlayer",       "Cancel player spawn packets.",       false);
const sS0D = new BooleanSetting(script, "S0DPacketCollectItem",       "Cancel item-collect animations.",    false);
const sS0E = new BooleanSetting(script, "S0EPacketSpawnObject",       "Cancel object spawn packets.",       false);
const sS0F = new BooleanSetting(script, "S0FPacketSpawnMob",          "Cancel mob spawn packets.",          false);
const sS12 = new BooleanSetting(script, "S12PacketEntityVelocity",    "Cancel velocity (knockback) packets.",false);
const sS12_SelfOnly = new BooleanSetting(script, "S12_SelfOnly", "Only cancel velocity packets aimed at you.", true);
sS12_SelfOnly.visible(() => sS12.getValue());
const sS13 = new BooleanSetting(script, "S13PacketDestroyEntities",   "Cancel entity-destroy packets.",     false);
const sS14 = new BooleanSetting(script, "S14PacketEntity",            "Cancel entity move/look packets.",   false);
const sS18 = new BooleanSetting(script, "S18PacketEntityTeleport",    "Cancel entity teleport packets.",    false);
const sS19 = new BooleanSetting(script, "S19PacketEntityHeadLook",    "Cancel entity head-look packets.",   false);
const sS1A = new BooleanSetting(script, "S1APacketEntityStatus",      "Cancel entity status packets.",      false);
const sS27 = new BooleanSetting(script, "S27PacketExplosion",         "Cancel explosion packets.",          false);
const sS2A = new BooleanSetting(script, "S2APacketParticles",         "Cancel particle packets.",           false);
const sS2C = new BooleanSetting(script, "S2CPacketSpawnGlobalEntity", "Cancel global-entity spawn (lightning).", false);
const sS2D = new BooleanSetting(script, "S2DPacketOpenWindow",        "Cancel open-window packets.",        false);
const sS2E = new BooleanSetting(script, "S2EPacketCloseWindow",       "Cancel close-window (server).",      false);
const sS2F = new BooleanSetting(script, "S2FPacketSetSlot",           "Cancel set-slot packets.",           false);
const sS3F = new BooleanSetting(script, "S3FPacketCustomPayload",     "Cancel server custom payloads.",     false);

// ---------------------------------------------------------------------------
// Dispatch
// ---------------------------------------------------------------------------
script.addListener("PacketSendEvent", (event) => {
    const p = event.packet;
    if (p == null) return;

    // ---- C0B EntityAction ----
    if (p instanceof C0BPacketEntityAction) {
        if (!cC0B.getValue()) return;
        var actionEA = "" + p.getAction();
        if ((actionEA === "START_SNEAKING"  && cC0B_StartSneak.getValue())  ||
            (actionEA === "STOP_SNEAKING"   && cC0B_StopSneak.getValue())   ||
            (actionEA === "START_SPRINTING" && cC0B_StartSprint.getValue()) ||
            (actionEA === "STOP_SPRINTING"  && cC0B_StopSprint.getValue())  ||
            (actionEA === "STOP_SLEEPING"   && cC0B_StopSleep.getValue())   ||
            (actionEA === "RIDING_JUMP"     && cC0B_RidingJump.getValue())  ||
            (actionEA === "OPEN_INVENTORY"  && cC0B_OpenInv.getValue())) {
            event.cancel();
        }
        return;
    }

    // ---- C07 PlayerDigging ----
    if (p instanceof C07PacketPlayerDigging) {
        if (!cC07.getValue()) return;
        var actionDig = "" + p.getAction();
        if ((actionDig === "START_DESTROY_BLOCK" && cC07_START.getValue())   ||
            (actionDig === "ABORT_DESTROY_BLOCK" && cC07_ABORT.getValue())   ||
            (actionDig === "STOP_DESTROY_BLOCK"  && cC07_STOP.getValue())    ||
            (actionDig === "DROP_ALL_ITEMS"      && cC07_DROPALL.getValue()) ||
            (actionDig === "DROP_ITEM"           && cC07_DROP.getValue())    ||
            (actionDig === "RELEASE_USE_ITEM"    && cC07_RELEASE.getValue())) {
            event.cancel();
        }
        return;
    }

    // ---- C02 UseEntity ----
    if (p instanceof C02PacketUseEntity) {
        if (!cC02.getValue()) return;
        var actionUE = "" + p.getAction();
        if ((actionUE === "ATTACK"       && cC02_ATTACK.getValue())   ||
            (actionUE === "INTERACT"     && cC02_INTERACT.getValue()) ||
            (actionUE === "INTERACT_AT"  && cC02_INTERACT_AT.getValue())) {
            event.cancel();
        }
        return;
    }

    // ---- C03 Player family (most specific first) ----
    if (typeof C06PacketPlayerPosLook !== "undefined" && p instanceof C06PacketPlayerPosLook) {
        if (cC06.getValue()) event.cancel();
        return;
    }
    if (typeof C05PacketPlayerLook !== "undefined" && p instanceof C05PacketPlayerLook) {
        if (cC05.getValue()) event.cancel();
        return;
    }
    if (typeof C04PacketPlayerPosition !== "undefined" && p instanceof C04PacketPlayerPosition) {
        if (cC04.getValue()) event.cancel();
        return;
    }
    if (p instanceof C03PacketPlayer) {
        if (cC03.getValue()) event.cancel();
        return;
    }

    // ---- Simple toggles ----
    if (p instanceof C00PacketKeepAlive)         { if (cC00.getValue()) event.cancel(); return; }
    if (p instanceof C01PacketChatMessage)       { if (cC01.getValue()) event.cancel(); return; }
    if (p instanceof C08PacketBlockPlacement)    { if (cC08.getValue()) event.cancel(); return; }
    if (p instanceof C09PacketHeldItemChange)    { if (cC09.getValue()) event.cancel(); return; }
    if (p instanceof C0APacketAnimation)         { if (cC0A.getValue()) event.cancel(); return; }
    if (p instanceof C0CPacketInput)             { if (cC0C.getValue()) event.cancel(); return; }
    if (p instanceof C0DPacketCloseWindow)       { if (cC0D.getValue()) event.cancel(); return; }
    if (p instanceof C0EPacketClickWindow)       { if (cC0E.getValue()) event.cancel(); return; }
    if (p instanceof C0FPacketConfirmTransaction){ if (cC0F.getValue()) event.cancel(); return; }
    if (p instanceof C17PacketCustomPayload)     { if (cC17.getValue()) event.cancel(); return; }
});

script.addListener("PacketReceiveEvent", (event) => {
    const p = event.packet;
    if (p == null) return;

    // ---- S12 EntityVelocity (with self-only filter) ----
    if (p instanceof S12PacketEntityVelocity) {
        if (!sS12.getValue()) return;
        if (sS12_SelfOnly.getValue()) {
            if (mc.player == null) return;
            try {
                if (p.getEntityID() !== mc.player.getEntityId()) return;
            } catch (e) {
                try {
                    if (p.getEntityId() !== mc.player.getEntityId()) return;
                } catch (e2) {}
            }
        }
        event.cancel();
        return;
    }

    if (p instanceof S00PacketKeepAlive)         { if (sS00.getValue()) event.cancel(); return; }
    if (p instanceof S01PacketJoinGame)          { if (sS01.getValue()) event.cancel(); return; }
    if (p instanceof S02PacketChat)              { if (sS02.getValue()) event.cancel(); return; }
    if (p instanceof S03PacketTimeUpdate)        { if (sS03.getValue()) event.cancel(); return; }
    if (p instanceof S04PacketEntityEquipment)   { if (sS04.getValue()) event.cancel(); return; }
    if (p instanceof S05PacketSpawnPosition)     { if (sS05.getValue()) event.cancel(); return; }
    if (p instanceof S06PacketUpdateHealth)      { if (sS06.getValue()) event.cancel(); return; }
    if (p instanceof S07PacketRespawn)           { if (sS07.getValue()) event.cancel(); return; }
    if (p instanceof S08PacketPlayerPosLook)     { if (sS08.getValue()) event.cancel(); return; }
    if (p instanceof S09PacketHeldItemChange)    { if (sS09.getValue()) event.cancel(); return; }
    if (p instanceof S0CPacketSpawnPlayer)       { if (sS0C.getValue()) event.cancel(); return; }
    if (p instanceof S0DPacketCollectItem)       { if (sS0D.getValue()) event.cancel(); return; }
    if (p instanceof S0EPacketSpawnObject)       { if (sS0E.getValue()) event.cancel(); return; }
    if (p instanceof S0FPacketSpawnMob)          { if (sS0F.getValue()) event.cancel(); return; }
    if (p instanceof S13PacketDestroyEntities)   { if (sS13.getValue()) event.cancel(); return; }
    if (p instanceof S14PacketEntity)            { if (sS14.getValue()) event.cancel(); return; }
    if (p instanceof S18PacketEntityTeleport)    { if (sS18.getValue()) event.cancel(); return; }
    if (p instanceof S19PacketEntityHeadLook)    { if (sS19.getValue()) event.cancel(); return; }
    if (p instanceof S1APacketEntityStatus)      { if (sS1A.getValue()) event.cancel(); return; }
    if (p instanceof S27PacketExplosion)         { if (sS27.getValue()) event.cancel(); return; }
    if (p instanceof S2APacketParticles)         { if (sS2A.getValue()) event.cancel(); return; }
    if (p instanceof S2CPacketSpawnGlobalEntity) { if (sS2C.getValue()) event.cancel(); return; }
    if (p instanceof S2DPacketOpenWindow)        { if (sS2D.getValue()) event.cancel(); return; }
    if (p instanceof S2EPacketCloseWindow)       { if (sS2E.getValue()) event.cancel(); return; }
    if (p instanceof S2FPacketSetSlot)           { if (sS2F.getValue()) event.cancel(); return; }
    if (p instanceof S3FPacketCustomPayload)     { if (sS3F.getValue()) event.cancel(); return; }
});
