import paramiko
import serial
import psycopg2
import configparser

# Reading connection information from .cnf file
config = configparser.ConfigParser()
config.read('conninfo.cnf')

# Storing connection paramaters
hostname = config.get('connection', 'hostname')
port = config.getint('connection', 'port')
username = config.get('connection', 'username')
password = config.get('connection', 'password')

# Paramiko setup for ssh connection
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    # Trying to establish connection to remote host
    ssh.connect(hostname, port, username, password)

    # Accessing postgresql database
    db = psycopg2.connect(
        host=hostname,
        port=5433,
        user="arduino",
        password="password",
        database="sensors"
    )

    cursor = db.cursor()

    #  COM ändras beroende på vilken din arduino IDE använder.
    ser = serial.Serial('COM4', 9600)

    try:
        while True:
            # Läser en linje av arduino temperatur datan.
            line = ser.readline().decode('utf-8').strip()
            
            try:
                temperature = float(line)
                query = "INSERT INTO bör ha (temp) VALUES (%s, 'Stockholm E')"
                cursor.execute(query, (temperature,))
                db.commit()
                print(f"Sparar temp {temperature} i SQL DB.")
            except ValueError:
                #Felaktig dataformat, triggar denna meddelande.
                print(f"Felaktig data: {line}")

    except KeyboardInterrupt:
        print("\nStänger...")

except paramiko.AuthenticationException:
    print("Connection failed...")
finally:
    ser.close()
    cursor.close()
    db.close()
    ssh.close()