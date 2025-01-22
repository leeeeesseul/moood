from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import jpype
from jpype import JClass
import os
import urllib.parse

app = FastAPI()

class DataModel(BaseModel):
    data: str


# Global variables
KSEED = None
KSHA2 = None

def start_jvm():
    global KSEED
    global KSHA2

    if not jpype.isJVMStarted():
        # Get the absolute path of the current directory
        current_dir = os.path.abspath(os.path.dirname(__file__))

        # Construct the full path to the JAR file
        jar_path = os.path.join(current_dir, "KmcCrypto.jar")

        # Start the JVM with the correct classpath and library path
        jpype.startJVM(jpype.getDefaultJVMPath(), "-Djava.class.path=" + jar_path)

        # Import the KSEED class
        KSEED = JClass("com.kmc.crypto.KSEED")
        KSHA2 = JClass("com.kmc.crypto.KSHA2")


@app.on_event("startup")
def on_startup():
    start_jvm()


@app.on_event("shutdown")
def on_shutdown():
    if jpype.isJVMStarted():
        jpype.shutdownJVM()


@app.post("/kseed/icert_seed_encript_and_sha256/")
def icert_seed_encript_and_sha256(data_model: DataModel):
    data = data_model.data

    try:
        # Use the KSEED class
        kseed = KSEED()
        ksha2 = KSHA2()

        enc_tr_cert = kseed.IcertSeedEncript(data)
        hmac_msg = ksha2.IcertSha256(enc_tr_cert)

        data = {
            "enc_tr_cert": str(enc_tr_cert),
            "hmac_msg": str(hmac_msg)
        }

        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/kseed/icert_seed_decript_and_sha256/")
def icert_seed_encript_and_sha256(data_model: DataModel):
    data = data_model.data

    try:
        # Use the KSEED class
        kseed = KSEED()
        ksha2 = KSHA2()

        enc_tr_cert = kseed.IcertSeedDecript(data)
        hmac_msg = ksha2.IcertSha256(enc_tr_cert)

        data = {
            "enc_tr_cert": str(enc_tr_cert),
            "hmac_msg": str(hmac_msg)
        }

        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/kseed/icert_seed_encript/")
def icert_seed_encript(data_model: DataModel):
    data = data_model.data

    try:
        # Use the KSEED class
        kseed = KSEED()
        enc_tr_cert = kseed.IcertSeedEncript(data)
        print(enc_tr_cert)
        return {"enc_tr_cert": str(enc_tr_cert)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/kseed/icert_seed_decript/")
def icert_seed_encript(data_model: DataModel):
    data = data_model.data

    try:
        # Use the KSEED class
        kseed = KSEED()
        dec_tr_cert = kseed.IcertSeedDecript(data)

        decode_data = urllib.parse.unquote(str(dec_tr_cert))

        return {"dec_tr_cert": decode_data}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="Invalid data")


@app.post("/kseed/icert_sha256/")
def icert_sha256(data_model: DataModel):
    data = data_model.data

    try:
        # Use the KSHA2 class
        ksha2 = KSHA2()
        hmac_msg = ksha2.IcertSha256(data)
        print(hmac_msg)
        return {"hmac_msg": str(hmac_msg)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
