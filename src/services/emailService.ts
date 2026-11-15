import type { ScanJob } from '../types/watch';
import nodemailer from 'nodemailer';

export interface EmailSendResult {
  sent: boolean;
  provider: 'resend' | 'smtp' | 'none';
  messageId?: string;
  error?: string;
}

/**
 * Generate formatted HTML email content for scanner job summary.
 */
export function generateScanSummaryHtml(job: ScanJob): string {
  const metrics = job.metrics;
  const failureRate = metrics?.failureRatePercent ?? 0;
  const avgLatency = metrics?.avgLatencyMs ?? 0;
  const isHealthy = job.status === 'completed' && failureRate === 0;
  const isCritical = job.status === 'failed' || failureRate >= 25;

  const statusBg = isHealthy ? '#059669' : isCritical ? '#e11d48' : '#d97706';
  const statusText = isHealthy
    ? 'ALL SYSTEMS OPERATIONAL'
    : isCritical
    ? 'CRITICAL SLA ALERT'
    : 'DEGRADED PERFORMANCE';

  let dealsHtml = '';
  if (job.dealsDiscovered.length > 0) {
    dealsHtml = `
      <div style="margin-top: 24px;">
        <h3 style="color: #1e293b; font-size: 15px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
          🔥 Top Market Deals Discovered (≥15% Off)
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; color: #64748b; font-size: 11px;">
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Component</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Store</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1; text-align: right;">Prior</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1; text-align: right;">Deal Price</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1; text-align: right;">Savings</th>
            </tr>
          </thead>
          <tbody>
            ${job.dealsDiscovered
              .map(
                d => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 12px; font-weight: 600; color: #0f172a;">${d.componentName}</td>
                <td style="padding: 10px 12px; color: #64748b;">${d.storeName}</td>
                <td style="padding: 10px 12px; text-align: right; color: #94a3b8; text-decoration: line-through;">$${d.oldPrice.toFixed(2)}</td>
                <td style="padding: 10px 12px; text-align: right; font-weight: bold; color: #b45309;">$${d.newPrice.toFixed(2)}</td>
                <td style="padding: 10px 12px; text-align: right; font-weight: bold; color: #059669;">-${d.discountPercent}%</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  let suppliersHtml = '';
  if (job.sourceResults && job.sourceResults.length > 0) {
    suppliersHtml = `
      <div style="margin-top: 24px;">
        <h3 style="color: #1e293b; font-size: 15px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
          📡 Supplier Feed Latency & Status
        </h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background: #f1f5f9; text-align: left; color: #64748b; font-size: 11px;">
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Supplier</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Status</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">HTTP</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Latency</th>
              <th style="padding: 8px 12px; border-bottom: 1px solid #cbd5e1;">Diagnostics</th>
            </tr>
          </thead>
          <tbody>
            ${job.sourceResults
              .map(
                s => `
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 9px 12px; font-weight: 500; color: #0f172a;">${s.sourceName}</td>
                <td style="padding: 9px 12px;">
                  <span style="display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 10px; font-weight: bold; text-transform: uppercase; background: ${
                    s.status === 'online' ? '#dcfce7; color: #15803d;' : s.status === 'degraded' ? '#fef3c7; color: #b45309;' : '#ffe4e6; color: #be123c;'
                  }">
                    ${s.status}
                  </span>
                </td>
                <td style="padding: 9px 12px; font-family: monospace; color: #475569;">${s.statusCode}</td>
                <td style="padding: 9px 12px; font-family: monospace; color: #475569;">${s.latencyMs}ms</td>
                <td style="padding: 9px 12px; color: #64748b; font-size: 11px;">${s.error || 'Normal'}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>DialForge Scanner Summary</title>
      </head>
      <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #334155;">
        <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background: #0f172a; padding: 24px; color: #ffffff;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h1 style="margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #d4af37;">DialForge</h1>
                <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8;">Horological Supplier Scanner Telemetry Report</p>
              </div>
              <span style="display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; background: ${statusBg}; color: #ffffff;">
                ${statusText}
              </span>
            </div>
          </div>

          <!-- Alert Note if triggered -->
          ${
            metrics?.alertTriggered
              ? `
            <div style="background: ${isCritical ? '#fef2f2' : '#fffbeb'}; border-bottom: 1px solid ${isCritical ? '#fecaca' : '#fde68a'}; padding: 14px 24px; color: ${isCritical ? '#991b1b' : '#92400e'}; font-size: 13px;">
              <strong>⚠️ ${metrics.alertSeverity?.toUpperCase()} Alert:</strong> ${metrics.alertMessage}
            </div>
          `
              : ''
          }

          <div style="padding: 24px;">
            <!-- KPI Cards -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Failure Rate</div>
                <div style="font-size: 20px; font-weight: bold; color: ${failureRate > 0 ? '#e11d48' : '#059669'}; margin-top: 4px;">${failureRate}%</div>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Success Rate</div>
                <div style="font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 4px;">${metrics?.overallSuccessRate ?? 100}%</div>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Avg Latency</div>
                <div style="font-size: 20px; font-weight: bold; color: #0f172a; margin-top: 4px;">${avgLatency}ms</div>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px; text-align: center;">
                <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Deals Found</div>
                <div style="font-size: 20px; font-weight: bold; color: #b45309; margin-top: 4px;">${job.priceDropsDetected}</div>
              </div>
            </div>

            <!-- Top Deals Table -->
            ${dealsHtml}

            <!-- Supplier Telemetry Table -->
            ${suppliersHtml}

            <!-- Footer & Console Links -->
            <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
              <p style="margin: 0 0 10px;">
                <a href="https://dialforge-app.web.app" style="color: #0284c7; text-decoration: none; margin-right: 15px; font-weight: 500;">🌐 Open DialForge App</a>
                <a href="https://console.firebase.google.com/project/dialforge-app/firestore" style="color: #0284c7; text-decoration: none; margin-right: 15px; font-weight: 500;">📦 Firebase Firestore</a>
                <a href="https://console.cloud.google.com/monitoring/dashboards" style="color: #0284c7; text-decoration: none; font-weight: 500;">📊 Cloud Monitoring Dashboard</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Dispatched automatically by DialForge Scanner Cron (${job.timestamp})
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Send scan summary email using Resend API or SMTP (Nodemailer).
 */
export async function sendScanSummaryEmail(job: ScanJob): Promise<EmailSendResult> {
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'nikhil_ihs@hotmail.com';
  const htmlContent = generateScanSummaryHtml(job);

  const failureRate = job.metrics?.failureRatePercent ?? 0;
  const statusEmoji = job.status === 'completed' && failureRate === 0 ? '🟢' : failureRate >= 25 ? '🔴' : '🟡';
  const subject = `${statusEmoji} DialForge Scan Summary: ${failureRate}% Failure Rate, ${job.priceDropsDetected} Deals Found`;

  // 1. Try Resend API (Free 3,000 emails/mo, zero SMTP configuration)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'DialForge Scanner <onboarding@resend.dev>',
          to: recipientEmail,
          subject,
          html: htmlContent
        })
      });

      if (response.ok) {
        const data = (await response.json()) as { id?: string };
        return { sent: true, provider: 'resend', messageId: data.id };
      } else {
        const errText = await response.text();
        console.warn('Resend API error:', errText);
      }
    } catch (err: unknown) {
      console.warn('Resend dispatch error:', err);
    }
  }

  // 2. Try SMTP via Nodemailer (e.g. Gmail / Outlook / Hotmail SMTP with App Password)
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || (smtpUser?.includes('gmail') ? 'smtp.gmail.com' : 'smtp-mail.outlook.com');
  const smtpPort = Number(process.env.SMTP_PORT) || 587;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      const info = await transporter.sendMail({
        from: `"DialForge Scanner" <${smtpUser}>`,
        to: recipientEmail,
        subject,
        html: htmlContent
      });

      return { sent: true, provider: 'smtp', messageId: info.messageId };
    } catch (err: unknown) {
      console.warn('SMTP dispatch error:', err);
      return { sent: false, provider: 'smtp', error: String(err) };
    }
  }

  return {
    sent: false,
    provider: 'none',
    error: 'No email credentials configured. Set RESEND_API_KEY or SMTP_USER/SMTP_PASSWORD in secrets/env.'
  };
}
