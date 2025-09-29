const alertSchema = require('../models/alertValidation');
const { sendEmergencyNotification } = require('../services/notificationService');

let db_alerts = [];
let alert_counter = 0;

exports.createAlert = (req, res) => {
    const { error, value } = alertSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: "Dados inválidos", details: error.details });
    }

    try {
        alert_counter++;
        const newAlert = {
            alert_id: alert_counter,
            timestamp: new Date().toISOString(),
            ...value
        };

        sendEmergencyNotification(newAlert);

        db_alerts.push(newAlert);

        return res.status(201).json(newAlert);

    } catch (e) {
        console.error("Falha ao processar o alerta:", e);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

exports.getRecentAlerts = (req, res) => {
    const recentAlerts = [...db_alerts]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
    
    return res.status(200).json(recentAlerts);
};

exports.clearAlertsForTesting = () => {
    db_alerts = [];
    alert_counter = 0;
};