document.addEventListener('DOMContentLoaded', () => {
    const uptimeInput = document.getElementById('uptime-input');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const resultsSection = document.getElementById('results-section');
    const downtimeDay = document.getElementById('downtime-day');
    const downtimeWeek = document.getElementById('downtime-week');
    const downtimeMonth = document.getElementById('downtime-month');
    const downtimeQuarter = document.getElementById('downtime-quarter');
    const downtimeYear = document.getElementById('downtime-year');
    const copyButtons = document.querySelectorAll('.btn-copy-result');
    const clickableRows = document.querySelectorAll('.clickable-row');
    
    const SECONDS_PER_DAY = 86400;
    const SECONDS_PER_WEEK = 604800;
    const SECONDS_PER_MONTH = 2592000;
    const SECONDS_PER_QUARTER = 7776000;
    const SECONDS_PER_YEAR = 31536000;

    function trackEvent(action, label, value) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': 'SLA Calculator',
                'event_label': label,
                'value': value ? parseFloat(value) : undefined
            });
        }
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function formatDuration(seconds) {
        if (seconds < 0) return '—';
        
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const millis = Math.round((seconds % 1) * 1000);

        const parts = [];

        if (days > 0) parts.push(`${days}d`);
        if (hours > 0 || days > 0) parts.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
        if (secs > 0 || minutes > 0 || hours > 0 || days > 0) parts.push(`${secs}s`);
        
        if (parts.length === 0 || (days === 0 && hours === 0 && minutes === 0 && secs === 0)) {
            if (millis > 0) {
                parts.push(`${millis}ms`);
            } else if (parts.length === 0) {
                parts.push('0s');
            }
        }

        if (parts.length > 3) {
            return parts.slice(0, 3).join(' ');
        }
        return parts.join(' ');
    }

    function calculateDowntime(uptimePercent) {
        const downtimeFraction = (100 - uptimePercent) / 100;
        
        return {
            day: downtimeFraction * SECONDS_PER_DAY,
            week: downtimeFraction * SECONDS_PER_WEEK,
            month: downtimeFraction * SECONDS_PER_MONTH,
            quarter: downtimeFraction * SECONDS_PER_QUARTER,
            year: downtimeFraction * SECONDS_PER_YEAR
        };
    }

    function updateResults(uptimePercent) {
        if (isNaN(uptimePercent) || uptimePercent < 0 || uptimePercent > 100) {
        downtimeDay.textContent = '—';
        downtimeWeek.textContent = '—';
        downtimeMonth.textContent = '—';
        downtimeQuarter.textContent = '—';
        downtimeYear.textContent = '—';
        return;
        }

        const downtime = calculateDowntime(uptimePercent);

        downtimeDay.textContent = formatDuration(downtime.day);
        downtimeWeek.textContent = formatDuration(downtime.week);
        downtimeMonth.textContent = formatDuration(downtime.month);
        downtimeQuarter.textContent = formatDuration(downtime.quarter);
        downtimeYear.textContent = formatDuration(downtime.year);
    }

    function handleUptimeInput() {
        const value = parseFloat(uptimeInput.value);
        updateResults(value);

        presetBtns.forEach(btn => {
            const btnValue = parseFloat(btn.dataset.value);
            if (value === btnValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (!isNaN(value) && value >= 0 && value <= 100) {
            trackEvent('calculate', 'Uptime to Downtime', value.toString());
        }
    }

    function handlePresetClick(event) {
        const value = event.currentTarget.dataset.value;
        uptimeInput.value = value;
        
        presetBtns.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
        
        updateResults(parseFloat(value));
        trackEvent('preset_click', 'Preset: ' + value);
    }

    function handleRowClick(event) {
        const uptime = event.currentTarget.dataset.uptime;
        uptimeInput.value = uptime;
        
        presetBtns.forEach(btn => {
            if (btn.dataset.value === uptime) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        updateResults(parseFloat(uptime));
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        trackEvent('table_row_click', 'Uptime: ' + uptime, uptime);
    }

    function copyResult(event) {
        const targetId = event.currentTarget.dataset.copy;
        const targetElement = document.getElementById(targetId);
        const text = targetElement.textContent;

        if (text && text !== '—') {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(event.currentTarget);
                trackEvent('copy', 'Copy: ' + targetId);
            }).catch(() => {
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showCopyFeedback(event.currentTarget);
            });
        }
    }

    function showCopyFeedback(button) {
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#10b981';
        
        setTimeout(() => {
            button.innerHTML = originalIcon;
            button.style.color = '';
        }, 1500);
    }

    uptimeInput.addEventListener('input', debounce(handleUptimeInput, 300));
    uptimeInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleUptimeInput();
        }
    });

    presetBtns.forEach(btn => {
        btn.addEventListener('click', handlePresetClick);
    });

    clickableRows.forEach(row => {
        row.addEventListener('click', handleRowClick);
    });

    copyButtons.forEach(btn => {
        btn.addEventListener('click', copyResult);
    });

    uptimeInput.value = '99.9';
    handleUptimeInput();
    presetBtns.forEach(btn => {
        if (btn.dataset.value === '99.9') {
            btn.classList.add('active');
        }
    });

    trackEvent('tool_load', 'sla_calculator_tool');
});
