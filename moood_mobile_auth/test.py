import requests

url = "http://localhost:8080/kseed/icert_seed_decript/"

# The data to be sent in the POST request

encode_data = "CBEFA68B49254A8C4E39B9A75AFCC0AD7C7424D587A971EDAD6E7247EBAB23D3045936C1CE409231404369168A9B06CA0A23195A87BBD57EF26BDEB055FCB49D06F92A63C8704ECD6ECE471A987D1EB4B557247956285B0718F97C8B35D7EE0A1B69E938AE7E08FD545816C38348240C658ABF573ADA1688B6F2CB9B6123EF3657921DE97BA33BF6FC830F23542EA1263C440D71CC765A6E0666B13C2085C789452248E1A2D21B2BDF37537770DFB364C101273CA177DA4E016D72BF3613E63076B0B2F6DF342EEC60834CA0A55E282816814CA8D0737626471DA4FE965EC3CD841530AB2E736DD21DCF2F977916E83BA9B914C8EC16E35D6F510383512D9240F192ACCEEF3AA5DC61A8710E49FF964D3F0A1384B32D31DC61FD877BC6A6B2874EEF67583C060B895ED23B446B0F55245C2F40370A7B9BAD288367E504A4A53083B6DE9F664B3BE41F50983DD7986730"
data = {
    "data": encode_data
}

# Set the headers to indicate the content type is JSON
headers = {
    "Content-Type": "application/json"
}

# Make the POST request
response = requests.post(url, json=data, headers=headers)

print(response.content)