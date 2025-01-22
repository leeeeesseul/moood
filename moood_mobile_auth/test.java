import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class Main {
    public static void main(String[] args) {
        // Assuming the class you want to access from the JAR is com.example.SomeClass
        com.kmc.crypto.KSEED someClassInstance = new com.kmc.crypto.KSEED();

        // Call a method from SomeClass (replace methodName with the actual method)
        String value = someClassInstance.IcertSeedDecript("CBEFA68B49254A8C4E39B9A75AFCC0AD7C7424D587A971EDAD6E7247EBAB23D3045936C1CE409231404369168A9B06CA0A23195A87BBD57EF26BDEB055FCB49D06F92A63C8704ECD6ECE471A987D1EB4B557247956285B0718F97C8B35D7EE0A1B69E938AE7E08FD545816C38348240C658ABF573ADA1688B6F2CB9B6123EF3657921DE97BA33BF6FC830F23542EA1263C440D71CC765A6E0666B13C2085C7894");

        System.out.println(value);
        byte[] encodedBytes = value.getBytes("EUC-KR");
        System.out.println(encodedBytes);
}
}