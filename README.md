# raspi2-power-monitor
Log brown-outs on a Raspberry Pi 2 and later to syslog.
So that you know if a power supply or cable needs replacing on
a headless Pi.

### Why? ###
The Raspberry Pi provides a visual indication of power supply
voltage drops below 4.63 V on an attached monitor by displaying a
small one inch rainbow colored square and on devices with recent
firmware by a "thunderbolt" icon. It also does this by turning the RED
Led on the board off and on.

However, there is no log in the system logs that allows us to help
diagnose a problem with the power supply that manifests as unexplained
system reboots.

There is no way to detect voltage values through just software, however
brownouts can be detected and logged by reading GPIO35 - which is a
register in the SoC - NOT CONNECTED to any pin in the 40-pin header, but
connected to the red LED.

### How do I get set up? ###

* Summary of set up
Tested on Raspbian running on Raspberry Pi 2 B
Running Node LTS v6.11.1

* Configuration
 - Clone this repository.
 - Enable UDP socket for rsyslog by editing /etc/rsyslogd.conf and make sure that the following lines are un-commented

    ```
        # provides UDP syslog reception
        $ModLoad imudp
        $UDPServerRun 514
    ```
 - Install the pigpio library `sudo apt-get install pigpio`
 - Do a `npm install`.
 - Copy the brownout-monitor.service file to the `/etc/systemd/system` directory
 - Enable the brownout-monitor service with
   ```
   sudo systemctl enable brownout-monitor.service
   ```
 - Start the service with
   ```
   sudo systemctl start brownout-monitor.service
   ```

* Brownouts will now be logged to /var/log/user.log
like so:
    ```
    Jul 27 13:31:34 box /home/pi/sandbox/raspi2-power-monitor/node_modules/ain2/index.js[16560]: Brownout ... Power Supply Voltage went below 4.63 V
    ```
