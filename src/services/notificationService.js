function sendEmergencyNotification(alert) {

    const message = `🚨 ALERTA DE ALAGAMENTO! 🚨
Sensor: ${alert.sensor_id}
Nível da Água: ${alert.water_level_cm} cm
Localização: (Lat: ${alert.latitude}, Lon: ${alert.longitude})
Ação imediata recomendada para a área.`;

    console.log("\n--- [SERVIÇO DE NOTIFICAÇÃO] ---");
    console.log(message);
    console.log("--- [FIM DA NOTIFICAÇÃO] ---\n");

    return { status: "success", message: "Notification sent to emergency services." };
}

module.exports = { sendEmergencyNotification };