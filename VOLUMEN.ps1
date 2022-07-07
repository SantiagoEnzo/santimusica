$Response = Invoke-WebRequest -URI http://192.168.1.4:2592/volumen
echo $Response.content