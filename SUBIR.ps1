$Response = Invoke-WebRequest -URI http://192.168.1.4:2592/subir
echo $Response.content