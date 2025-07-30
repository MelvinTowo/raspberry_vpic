# Authored by Melvin Towo
# Simple script to collect system metrics like CPU usage, RAM usage, and temperature.


import json
import os
import psutil


def get_temp():
    try:
        with open("/sys/class/thermal/thermal_zone0/temp", "r") as f:
            temp = int(f.read()) / 1000
        return round(temp, 1)
    except:
        return None

def get_storage():
    try:
        disk = psutil.disk_usage('/')
        storage_used = disk.used / (1024 ** 3)  # Convert bytes to GB
        return round(storage_used, 1)
    except:
        return None

def main():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().used / (1024 ** 2)
    temp = get_temp()
    storage = get_storage()

    print(json.dumps({
        "cpu": cpu,
        "ram": round(ram, 1),
        "temp": temp,
        "storage": storage
    }))

if __name__ == "__main__":
    main()