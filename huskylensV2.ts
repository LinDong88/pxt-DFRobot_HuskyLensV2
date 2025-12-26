/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV2"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {
    // MakeCode global types are automatically injected, these declarations are only to suppress IDE warnings
    // These declarations are not needed in the actual MakeCode compilation environment
    // ==================== Low-level Communication Code ====================
    export const enum Macro {
        I2CADDR = 0x50,
        // ===================== Commands ====================
        COMMAND_KNOCK = 0x00,
        COMMAND_GET_RESULT = 0x01,
        COMMAND_GET_ALGO_PARAM = 0x02,
        COMMAND_GET_RESULT_BY_ID = 0x03,
        COMMAND_GET_BLOCKS_BY_ID = 0x04,
        COMMAND_GET_ARROWS_BY_ID = 0x05,
        // RFU 0x06 - 0x09
        COMMAND_SET_ALGORITHM = 0x0A,
        COMMAND_SET_NAME_BY_ID = 0x0B,
        COMMAND_SET_MULTI_ALGORITHM = 0x0C,
        COMMAND_SET_MULTI_ALGORITHM_RATIO = 0x0D,
        COMMAND_SET_ALGO_PARAMS = 0x0E,
        COMMAND_UPDATE_ALGORITHM_PARAMS = 0x0F,
        // RFU 0x0F - 0x19
        COMMAND_RETURN_ARGS = 0x1A,
        COMMAND_RETURN_INFO = 0x1B,
        COMMAND_RETURN_BLOCK = 0x1C,
        COMMAND_RETURN_ARROW = 0x1D,
        // RFU 0x1E - 0x1F
        COMMAND_ACTION_TAKE_PHOTO = 0x20,
        COMMAND_ACTION_TAKE_SCREENSHOT = 0x21,
        COMMAND_ACTION_LEARN = 0x22,
        COMMAND_ACTION_FORGET = 0x23,
        COMMAND_ACTION_SAVE_KNOWLEDGES = 0x24,
        COMMAND_ACTION_LOAD_KNOWLEDGES = 0x25,
        COMMAND_ACTION_DRAW_RECT = 0x26,
        COMMAND_ACTION_CLEAR_RECT = 0x27,
        COMMAND_ACTION_DRAW_TEXT = 0x28,
        COMMAND_ACTION_CLEAR_TEXT = 0x29,
        COMMAND_ACTION_PLAY_MUSIC = 0x2A,
        COMMAND_EXIT = 0x2B,
        COMMAND_ACTION_LEARN_BLOCK = 0x2C,
        COMMAND_ACTION_DRAW_UNIQUE_RECT = 0x2D,
        COMMAND_ACTION_START_RECORDING = 0x2E,
        COMMAND_ACTION_STOP_RECORDING = 0x2F,
        // RFU 0x30 - 0x3F

        // ===================== Memory Layout ====================
        FRAME_BUFFER_SIZE = 128,
        MAX_RESULT_NUM = 6,
        CMD_BUFFER_SIZE = 32,
        ALGORITHM_COUNT = 1,
        CUSTOM_ALGORITHM_COUNT = 1,
        // ===================== LCD Screen ====================
        LCD_WIDTH = 640,
        LCD_HEIGHT = 480,
        //===================== Packet Head ====================
        HEADER_0_INDEX = 0,
        HEADER_1_INDEX = 1,
        COMMAND_INDEX = 2,
        ALGO_INDEX = 3,
        CONTENT_SIZE_INDEX = 4,
        CONTENT_INDEX = 5,
        PROTOCOL_SIZE = 6,
        //===================== Time out ====================
        TIMEOUT = 2000
    }

    class PacketHead {
        static readonly HEADER_SIZE = 5;

        head55: number;
        headaa: number;
        cmd: number;
        algo_id: number;
        data_length: number;
        data: Buffer;
        name?: string;
        cs: number;
        static checksum(buf: Buffer): number {
            let sum = 0;
            for (let i = 0; i < buf.length; i++) {
                sum = (sum + buf[i]) & 0xFF;
            }
            return sum;
        }

        constructor(buffer: Buffer) {
            // In MakeCode, don't use throw, initialize directly (if buffer is too short, it will cause read errors)
            this.head55 = buffer.length > 0 ? buffer[0] : 0;
            this.headaa = buffer.length > 1 ? buffer[1] : 0;
            this.cmd = buffer.length > 2 ? buffer[2] : 0;
            this.algo_id = buffer.length > 3 ? buffer[3] : 0;
            this.data_length = buffer.length > 4 ? buffer[4] : 0;

            const expectedLength = PacketHead.HEADER_SIZE + this.data_length + 1;
            if (buffer.length < expectedLength) {
                // If buffer is incomplete, use empty Buffer
                this.data = Buffer.create(0);
                this.cs = 0;
            } else {
                this.data = buffer.slice(5, 5 + this.data_length);
                this.cs = buffer[5 + this.data_length];
            }
        }

        static fromFields(fields: {
            head55?: number;
            headaa?: number;
            cmd: number;
            algo_id: number;
            data?: Buffer;
            name?: string;
        }): Buffer {
            const data = fields.data ? fields.data : Buffer.create(0);
            const name_data = fields.name ? Buffer.fromUTF8(fields.name) : Buffer.create(0);
            let length = PacketHead.HEADER_SIZE + data.length + 1;

            let total_length = PacketHead.HEADER_SIZE + data.length + 1;
            if (name_data.length > 0) {
                total_length += name_data.length + 1;
            }
            const buf = Buffer.create(total_length);

            buf[0] = fields.head55 !== undefined ? fields.head55 : 0x55;
            buf[1] = fields.headaa !== undefined ? fields.headaa : 0xaa;
            buf[2] = fields.cmd;
            buf[3] = fields.algo_id;
            buf[4] = data.length;
            if (name_data.length > 0) {
                buf[4] += name_data.length + 1;
            }
            for (let i = 0; i < data.length; i++) {
                buf[5 + i] = data[i];
            }
            if (name_data.length > 0) {
                buf[5 + data.length] = name_data.length;
                for (let i = 0; i < name_data.length; i++) {
                    buf[5 + data.length + 1 + i] = name_data[i];
                }
            }

            const cs = PacketHead.checksum(buf.slice(0, PacketHead.HEADER_SIZE + total_length - 1));
            buf[total_length - 1] = cs;

            return buf;
        }

        verifyChecksum(): boolean {
            const buf = Buffer.create(PacketHead.HEADER_SIZE + this.data_length);
            buf[0] = this.head55;
            buf[1] = this.headaa;
            buf[2] = this.cmd;
            buf[3] = this.algo_id;
            buf[4] = this.data_length;
            for (let i = 0; i < this.data.length; i++) {
                buf[5 + i] = this.data[i];
            }

            const cs = PacketHead.checksum(buf);
            return cs === this.cs;
        }
    }

    class PacketData {
        buffer: Buffer;
        constructor(sizeOrBuffer: number | Buffer = 10) {
            if (typeof sizeOrBuffer === "number") {
                this.buffer = Buffer.create(sizeOrBuffer);
            } else {
                this.buffer = sizeOrBuffer;
            }
        }

        static from(buffer: Buffer): PacketData {
            return new PacketData(buffer);
        }

        // 第一个union - uint8_t类型
        get ID() { return this.buffer[0] }
        set ID(v: number) { this.buffer[0] = v & 0xff; }

        get maxID() { return this.buffer[0] }
        set maxID(v: number) { this.buffer[0] = v & 0xff; }

        get rfu0() { return this.buffer[0] }
        set rfu0(v: number) { this.buffer[0] = v & 0xff; }

        get resolution() { return this.buffer[0] }  // 新增：分辨率
        set resolution(v: number) { this.buffer[0] = v & 0xff; }

        get boardType() { return this.buffer[0] }
        set boardType(v: number) { this.buffer[0] = v & 0xff; }

        get multiAlgoNum() { return this.buffer[0] }
        set multiAlgoNum(v: number) { this.buffer[0] = v & 0xff; }

        // 删除了 totalSensors 属性

        // 第二个union - int8_t类型
        get rfu1() { return this.buffer[1]; }
        set rfu1(v: number) { this.buffer[1] = v & 0xff; }

        get level() { return this.buffer[1]; }
        set level(v: number) { this.buffer[1] = v & 0xff; }

        get mediaType() { return this.buffer[1]; }  // 新增：媒体类型
        set mediaType(v: number) { this.buffer[1] = v & 0xff; }

        get retValue() { return this.buffer[1]; }  // 新增：返回值
        set retValue(v: number) { this.buffer[1] = v & 0xff; }

        get lineWidth() { return this.buffer[1]; }  // 新增：线宽
        set lineWidth(v: number) { this.buffer[1] = v & 0xff; }

        get confidence() { return this.buffer[1]; }
        set confidence(v: number) { this.buffer[1] = v & 0xff; }

        // 删除了 currSensorIndex 属性

        // 第三个union - int16_t类型（使用buffer[2]和buffer[3]）
        get first() { return this.buffer[2] + this.buffer[3] * 256; }
        set first(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get xCenter() { return this.buffer[2] + this.buffer[3] * 256; }
        set xCenter(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get xTarget() { return this.buffer[2] + this.buffer[3] * 256; }
        set xTarget(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get duration() { return this.buffer[2] + this.buffer[3] * 256; }  // 新增：持续时间
        set duration(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get algorithmType() { return this.buffer[2] + this.buffer[3] * 256; }
        set algorithmType(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get classID() { return this.buffer[2] + this.buffer[3] * 256; }
        set classID(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        // 删除了 sensor0ID 属性
        get total_results() { return this.buffer[2] + this.buffer[3] * 256; }  // 保留：总结果数
        set total_results(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        // 第四个union - int16_t类型（使用buffer[4]和buffer[5]）
        get second() { return this.buffer[4] + this.buffer[5] * 256; }
        set second(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get yCenter() { return this.buffer[4] + this.buffer[5] * 256; }
        set yCenter(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get yTarget() { return this.buffer[4] + this.buffer[5] * 256; }
        set yTarget(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        // 删除了 sensor1ID 属性
        get total_results_learned() { return this.buffer[4] + this.buffer[5] * 256; }
        set total_results_learned(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get yaw() { return this.buffer[4] + this.buffer[5] * 256; }  // 新增：偏航角
        set yaw(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        // 第五个union - int16_t类型（使用buffer[6]和buffer[7]）
        get third() { return this.buffer[6] + this.buffer[7] * 256; }
        set third(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get width() { return this.buffer[6] + this.buffer[7] * 256; }
        set width(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get angle() { return this.buffer[6] + this.buffer[7] * 256; }
        set angle(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get azimuth() { return this.buffer[6] + this.buffer[7] * 256; }  // 新增：方位角
        set azimuth(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        // 删除了 sensor2ID 属性
        get total_blocks() { return this.buffer[6] + this.buffer[7] * 256; }
        set total_blocks(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get roll() { return this.buffer[6] + this.buffer[7] * 256; }  // 新增：横滚角
        set roll(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        // 第六个union - int16_t类型（使用buffer[8]和buffer[9]）
        get fourth() { return this.buffer[8] + this.buffer[9] * 256; }
        set fourth(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get height() { return this.buffer[8] + this.buffer[9] * 256; }
        set height(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get length() { return this.buffer[8] + this.buffer[9] * 256; }
        set length(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get total_blocks_learned() { return this.buffer[8] + this.buffer[9] * 256; }
        set total_blocks_learned(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get pitch() { return this.buffer[8] + this.buffer[9] * 256; }  // 新增：俯仰角
        set pitch(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get payload() {
            return this.buffer.slice(10);
        }
    }
    // Helper function: Convert Buffer to hexadecimal string (for debugging)
    export function bufferToHex(buf: Buffer, maxLen: number = 50): string {
        let hex = "";
        const len = buf.length > maxLen ? maxLen : buf.length;
        for (let i = 0; i < len; i++) {
            const val = buf[i] & 0xff;
            const high = (val >> 4) & 0x0f;
            const low = val & 0x0f;
            hex += (high < 10 ? String.fromCharCode(48 + high) : String.fromCharCode(87 + high));
            hex += (low < 10 ? String.fromCharCode(48 + low) : String.fromCharCode(87 + low));
            hex += " ";
        }
        if (buf.length > maxLen) {
            hex += "...";
        }
        return hex;
    }

    // Helper function: Decode UTF-8 bytes to string (simplified: ASCII + 3-byte UTF-8 for Chinese)
    export function decodeUTF8(buf: Buffer, start: number, length: number): string {
        let result = "";
        let i = start;
        let end = start + length;

        while (i < end && i < buf.length) {
            let byte1 = buf[i];

            // ASCII character (0x00-0x7F)
            if (byte1 < 0x80) {
                if (byte1 === 0) break; // Stop at null terminator
                result += String.fromCharCode(byte1);
                i++;
            }
            // 3-byte UTF-8 character (0xE0-0xEF) - Chinese characters typically use this
            else if ((byte1 & 0xF0) === 0xE0 && i + 2 < end && i + 2 < buf.length) {
                let byte2 = buf[i + 1];
                let byte3 = buf[i + 2];
                if ((byte2 & 0xC0) === 0x80 && (byte3 & 0xC0) === 0x80) {
                    let codePoint = ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F);
                    result += String.fromCharCode(codePoint);
                    i += 3;
                } else {
                    i++; // Skip invalid byte
                }
            }
            else {
                i++; // Skip invalid or unsupported byte
            }
        }

        return result;
    }

    // Helper function: Extract string from Buffer, using \0 as terminator, supports UTF-8 encoding (including Chinese)
    export function bufferToString(buf: Buffer): string {
        // Find the position of the first null character (\0), which is the string terminator
        let validLength = buf.length;
        for (let i = 0; i < buf.length; i++) {
            if (buf[i] === 0) {
                validLength = i;
                break;
            }
        }
        // Only extract the valid part (before the first \0), preserving spaces that may be included in the name
        if (validLength > 0) {
            // Use UTF-8 decoder to properly handle multi-byte characters
            return decodeUTF8(buf, 0, validLength);
        }
        return "";
    }

    // Helper function: Extract string from Buffer at specific offset and length, using \0 as terminator
    export function bufferToStringAtOffset(buf: Buffer, offset: number, maxLength: number): string {
        // Find the position of the first null character (\0), which is the string terminator
        let validLength = maxLength;
        for (let i = 0; i < maxLength && (offset + i) < buf.length; i++) {
            if (buf[offset + i] === 0) {
                validLength = i;
                break;
            }
        }
        // Only extract the valid part (before the first \0)
        if (validLength > 0) {
            // Use UTF-8 decoder to properly handle multi-byte characters
            return decodeUTF8(buf, offset, validLength);
        }
        return "";
    }

    export class Result extends PacketData {
        used: number = 0;
        name: string = "";
        content: string = "";

        constructor(buffer: Buffer) {
            super(buffer);

            // Debug info: First check the first 20 bytes of buffer
            //console.log("=== Result constructor debug ===");
            //console.log("buffer length: " + buffer.length);
            //console.log("buffer[0-19] hex: " + bufferToHex(buffer.slice(0, 20), 20));
            //console.log("buffer[10] (name_length): " + buffer[10] + " (0x" + toHex(buffer[10]) + ")");

            let name_length = buffer[10];
            //console.log("name_length: " + name_length);

            // Check if name_length is 0, if so, there is no name field
            if (name_length === 0) {
                this.name = "";
                // For license plate and OCR recognition, content may still exist even when name_length is 0
                // Try to parse content from buffer[11] if buffer is long enough
                if (buffer.length > 11) {
                    let content_length = buffer[11];
                    if (content_length > 0 && buffer.length > 12 + content_length) {
                        this.content = bufferToStringAtOffset(buffer, 12, content_length);
                    } else {
                        this.content = "";
                    }
                } else {
                    this.content = "";
                }
                //console.log("name_length is 0, skipping name and content");
                //console.log("================================");
                return;
            }

            let content_length = buffer[11 + name_length];

            // Directly decode from buffer at specific offsets, avoiding slice() which may have issues in MakeCode
            this.name = bufferToStringAtOffset(buffer, 11, name_length);
            this.content = bufferToStringAtOffset(buffer, 12 + name_length, content_length);

            // Debug info: Print final result
            //console.log("final name: [" + this.name + "]");
            //console.log("final name length: " + this.name.length);
            //console.log("================================");
        }

        printInfo() {
            // console.log(`(${this.xCenter}, ${this.yCenter}) size=(${this.width}x${this.height})`);
        }
    }




    let maxID: number[] = [];
    for (let i = 0; i < Macro.ALGORITHM_COUNT; i++) {
        maxID.push(0);
    }

    // Use loop to initialize array to ensure ES5 compatibility
    let i2c_cached_data: number[] = []
    let receive_buffer: number[] = [];
    for (let i = 0; i < Macro.FRAME_BUFFER_SIZE; i++) {
        receive_buffer.push(0);
    }
    let receive_index = 0
    let timeOutTimer = 0
    export function timerBegin() { timeOutTimer = control.millis(); }
    export function timerAvailable(): boolean {
        return (control.millis() - timeOutTimer > Macro.TIMEOUT);
    }

    // Helper function: Convert number to hexadecimal string (ES5 compatible)
    export function toHex(num: number): string {
        let hex = "";
        let val = num & 0xff;
        let high = (val >> 4) & 0x0f;
        let low = val & 0x0f;
        hex += high < 10 ? String.fromCharCode(48 + high) : String.fromCharCode(87 + high);
        hex += low < 10 ? String.fromCharCode(48 + low) : String.fromCharCode(87 + low);
        return hex;
    }

    export function protocolAvailable(): boolean {
        let response = pins.i2cReadBuffer(Macro.I2CADDR, 32);
        if (response.length > 0) {
            // console.log("protocolAvailable: Received " + response.length + " bytes");
            // Print received raw data
            for (let k = 0; k < response.length; k++) {
                i2c_cached_data.push(response[k]);
            }
        }
        while (i2c_cached_data.length) {
            let data = i2c_cached_data.shift();
            if (data != null) {
                if (husky_lens_protocol_receive(data)) {
                    return true;
                }
            }
        }

        return false;
    }

    export function husky_lens_protocol_receive(data: number): boolean {
        //console.log("receive_index=" + receive_index + "  data=0x" + toHex(data));
        switch (receive_index) {
            case Macro.HEADER_0_INDEX:
                if (data != 0x55) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[Macro.HEADER_0_INDEX] = 0x55;
                break;
            case Macro.HEADER_1_INDEX:
                if (data != 0xaa) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[Macro.HEADER_1_INDEX] = 0xaa;
                break;
            case Macro.COMMAND_INDEX:
                receive_buffer[Macro.COMMAND_INDEX] = data;
                break;
            case Macro.ALGO_INDEX:
                receive_buffer[Macro.ALGO_INDEX] = data;
                break;
            case Macro.CONTENT_SIZE_INDEX:
                if (receive_index >= Macro.FRAME_BUFFER_SIZE - Macro.PROTOCOL_SIZE) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[Macro.CONTENT_SIZE_INDEX] = data;
                break;
            default:
                receive_buffer[receive_index] = data;
                let expectedLen = receive_buffer[Macro.CONTENT_SIZE_INDEX] + Macro.CONTENT_INDEX;
                if (receive_index == expectedLen) {
                    receive_index = 0;
                    return validateCheckSum();
                }
                break;
        }
        receive_index++;
        return false;
    }

    export function validateCheckSum(): boolean {
        let stackSumIndex = receive_buffer[Macro.CONTENT_SIZE_INDEX] + Macro.CONTENT_INDEX;
        let sum = 0;
        let i;
        for (i = 0; i < stackSumIndex; i++) {
            sum += receive_buffer[i];
        }
        sum = sum & 0xff;
        let expected = receive_buffer[stackSumIndex];
        let isValid = (sum == expected);
        return isValid;
    }

    function wait(cmd: number, command: number): boolean {
        //console.log("wait: Waiting for command 0x" + toHex(command));
        timerBegin();
        // receive_buffer[Macro.COMMAND_INDEX] = Algorithm.ALGORITHM_ANY;
        while (!timerAvailable()) {
            if (protocolAvailable()) {
                let receivedCmd = receive_buffer[Macro.COMMAND_INDEX];
                if (command === receivedCmd) {
                    return true;
                } else {
                    return false;
                }
            }
            basic.pause(10);
        }
        return false;
    }

    export function protocolWrite(buffer: Buffer) {
        pins.i2cWriteBuffer(Macro.I2CADDR, buffer);
    }

    export function beginInternal(): boolean {
        const dataBuf = Buffer.create(10);
        dataBuf[0] = 1;
        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_KNOCK,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        for (let i = 0; i < 20; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_KNOCK, Macro.COMMAND_RETURN_ARGS)) {
                return true;
            }
        }
        return false;
    }

    export function switchAlgorithmInternal(algo: number): boolean {
        const dataBuf = Buffer.create(10);
        dataBuf[0] = algo;
        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_SET_ALGORITHM,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        for (let i = 0; i < 3; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_SET_ALGORITHM, Macro.COMMAND_RETURN_ARGS)) {
                return true;
            }
        }
        return false;
    }

    export type ResultVariant = Result | FaceResult | HandResult | PoseResult | null;
    let result: ResultVariant[][] = [];
    for (let i = 0; i < Macro.ALGORITHM_COUNT; i++) {
        result[i] = [];
        for (let j = 0; j < Macro.MAX_RESULT_NUM; j++) {
            result[i][j] = null;
        }
    }
    let customId: number[] = [Algorithm.ALGORITHM_ANY, Algorithm.ALGORITHM_ANY, Algorithm.ALGORITHM_ANY];

    export function toRealID(id: number): number {
        let algo = id;
        if (id >= Algorithm.ALGORITHM_CUSTOM_BEGIN) {
            for (let i = 0; i < Macro.CUSTOM_ALGORITHM_COUNT; i++)
                if (customId[i] == algo) {
                    algo = (Algorithm.ALGORITHM_CUSTOM0 + i);
                    break;
                }
        }
        return algo;
    }

    export function availableInternal(algo: number): boolean {
        let ret = false;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r != null) {
                const res = r as Result;
                if (!res.used) {
                    ret = true;
                    break;
                }
            }
        }

        return ret;
    }

    export function getCachedResultMaxID(algo: number): number {
        // algo = toRealID(algo);
        algo = 0;
        return maxID[algo] || 0;
    }

    export function getResultInternal(algo: number): number {
        const dataBuf = Buffer.create(0);
        let retry = 3
        let pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_GET_RESULT,
            algo_id: algo,
            data: dataBuf,
        });

        let i = 0
        let _count = 0
        let info = new PacketData(Buffer.create(10));
        // algo = toRealID(algo);
        algo = 0;
        for (i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            result[algo][i] = null;
        }
        for (i = 0; i < retry; i++) {
            protocolWrite(pkt)
            if (wait(Macro.COMMAND_GET_RESULT, Macro.COMMAND_RETURN_INFO)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                info = new PacketData(buf.slice(5, buf.length - 1));
                maxID[algo] = info.maxID;
                // if (info.total_results > Macro.MAX_RESULT_NUM) {
                //     info.total_results = Macro.MAX_RESULT_NUM;
                // }
                if (info.total_blocks > Macro.MAX_RESULT_NUM) {
                    info.total_blocks = Macro.MAX_RESULT_NUM;
                }
                break;
            }
        }
        if (i == retry) {
            return -1;
        }
        for (i = 0; i < info.total_blocks; i++) {
            if (wait(0, Macro.COMMAND_RETURN_BLOCK)) {
                _count++;
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                let dataBuf = buf.slice(5, buf.length - 1);
                // if (algo == Algorithm.ALGORITHM_FACE_RECOGNITION) {
                //     result[algo][i] = new FaceResult(dataBuf);
                // } else if (algo == Algorithm.ALGORITHM_HAND_RECOGNITION) {
                //     result[algo][i] = new HandResult(dataBuf);
                // } else if (algo == Algorithm.ALGORITHM_POSE_RECOGNITION) {
                //     result[algo][i] = new PoseResult(dataBuf);
                // } else {
                result[algo][i] = new Result(dataBuf);
                // }
            }
        }
        for (i = info.total_blocks; i < info.total_results; i++) {
            if (wait(0, Macro.COMMAND_RETURN_ARROW)) {
                _count++;
                let buf = Buffer.create(receive_buffer.length);
                // for (let j = 0; j < receive_buffer.length; j++) {
                //     buf[j] = receive_buffer[j];
                // }
                result[algo][i] = new Result(buf.slice(5, buf.length - 1));
            }
        }
        return _count;
    }

    export function getCachedCenterResultInternal(algo: number): ResultVariant | null {
        // algo = toRealID(algo);
        algo = 0;
        let centerIndex = -1;
        let minLen = 999999999;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r) {
                const res = r as Result;
                const len = (res.xCenter - Macro.LCD_WIDTH / 2) ** 2 +
                    (res.yCenter - Macro.LCD_HEIGHT / 2) ** 2;
                if (len < minLen) {
                    minLen = len;
                    centerIndex = i;
                }
            }
        }
        if (centerIndex != -1) {
            return result[algo][centerIndex];
        }
        return null;
    }

    export function getCachedResultByIndexInternal(algo: number, index: number): ResultVariant | null {
        // algo = toRealID(algo);
        algo = 0;
        if (index >= Macro.MAX_RESULT_NUM) {
            return null;
        }
        return result[algo][index];
    }

    export function getCachedResultByIDInternal(algo: number, ID: number): ResultVariant | null {
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r == null) {
                continue;
            }
            const res = r as Result;
            if (res.ID == ID) {
                return r;
            }
        }
        return null;
    }

    export function getCachedResultNumInternal(algo: number): number {
        let count = 0;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                count++;
            }
        }
        return count;
    }

    export function getCachedResultLearnedNumInternal(algo: number): number {
        // algo = toRealID(algo);
        algo = 0;
        return getCachedResultMaxID(algo);
    }

    export function getCachedResultNumByIDInternal(algo: number, ID: number): number {
        let count = 0;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r) {
                const res = r as Result;
                if (ID == res.ID) {
                    count++;
                }
            }
        }
        return count;
    }

    export function getCachedIndexResultByIDInternal(algo: number, ID: number, index: number): ResultVariant | null {
        let rlt: ResultVariant | null = null;
        let _index = 0;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r) {
                const res = r as Result;
                if (ID == res.ID) {
                    if (_index == index) {
                        return r;
                    }
                    _index++;
                }
            }
        }
        return rlt;
    }

    export function getCurrentBranchInternal(algo: number): ResultVariant | null {
        // algo = toRealID(algo);
        algo = 0;
        const item = result[algo] && result[algo][0];

        if (item && item.level === 1) {
            return item;
        }

        return null;
    }

    export function getUpcomingBranchCountInternal(algo: number): number {
        let count = 0;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 0; i < Macro.MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                count++;
            }
        }
        return count > 0 ? count - 1 : 0;
    }

    export function getBranchInternal(algo: number, index: number): ResultVariant | null {
        let rlt: ResultVariant | null = null;
        index++;
        // algo = toRealID(algo);
        algo = 0;
        for (let i = 1; i < Macro.MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                if (i == index) {
                    rlt = result[algo][i];
                    break;
                }
            }
        }
        return rlt;
    }
    
    export function _playMusic(name: string, volume: number = 50): boolean {
        if (volume < 0) volume = 0;
        if (volume > 100) volume = 100;

        // 创建命令包
        const dataBuf = Buffer.create(10);
        dataBuf[0] = 0;  // 保留字节
        dataBuf[1] = 0;  // 保留字节
        // 设置音量（16位整数）
        dataBuf[2] = volume & 0xFF;
        dataBuf[3] = (volume >> 8) & 0xFF;
        // 添加6个零字节
        for (let i = 4; i < 10; i++) {
            dataBuf[i] = 0;
        }

        // 创建包头，包含字符串数据
        const nameBuf = Buffer.fromUTF8(name);
        const totalBuf = Buffer.create(11 + nameBuf.length); // 10字节数据 + 1字节长度 + 名称长度
        for (let i = 0; i < 10; i++) {
            totalBuf[i] = dataBuf[i];
        }
        totalBuf[10] = nameBuf.length; // 名称长度
        for (let i = 0; i < nameBuf.length; i++) {
            totalBuf[11 + i] = nameBuf[i];
        }

        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_PLAY_MUSIC,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: totalBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_PLAY_MUSIC, Macro.COMMAND_RETURN_ARGS)) {
                // 检查返回值
                const responsePacket = new PacketData(Buffer.create(10));
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }
    export const enum eResolution_t {
        RESOLUTION_DEFAULT = 0,
        RESOLUTION_640x480 = 1,
        RESOLUTION_1280x720 = 2,
        RESOLUTION_1920x1080 = 3,
    };
    export function _takePhoto(resolution: number): string {
        const dataBuf = Buffer.create(10);
        dataBuf[0] = resolution;  // 设置分辨率
        // 添加9个零字节
        for (let i = 1; i < 10; i++) {
            dataBuf[i] = 0;
        }

        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_TAKE_PHOTO,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_TAKE_PHOTO, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));

                if (packetData.retValue !== 0) {
                    return "";
                }

                // 从payload中提取字符串
                return bufferToString(packetData.payload);
            }
        }

        return "";
    }
    export function _takeScreenshot(): string {
        const dataBuf = Buffer.create(0);
        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_TAKE_SCREENSHOT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_TAKE_SCREENSHOT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));

                if (packetData.retValue !== 0) {
                    return "";
                }

                // 从payload中提取字符串
                return bufferToString(packetData.payload);
            }
        }

        return "";
    }


    /**
     * 绘制或更新指示框
     * @param color 框的颜色
     * @param lineWidth 线宽
     * @param x 起点X坐标
     * @param y 起点Y坐标
     * @param w 宽度
     * @param h 高度
     */
    //% block="Draw or update indicator box Color%color Line width%lineWidth x%x y%y width%w height%h"
    //% subcategory="Screen Display"
    //% weight=90
    //% color.min=0 color.max=16777215
    //% lineWidth.min=1 lineWidth.max=10
    //% x.min=0 x.max=640
    //% y.min=0 y.max=480
    //% w.min=1 w.max=640
    //% h.min=1 h.max=480
    export function drawBox(color: number, lineWidth: number, x: number, y: number, w: number, h: number): void {
        const dataBuf = Buffer.create(16);
        dataBuf[0] = 0;  // 保留字节
        dataBuf[1] = lineWidth;  // 线宽
        
        // 设置坐标和尺寸 (int16_t)
        dataBuf[2] = x & 0xFF;
        dataBuf[3] = (x >> 8) & 0xFF;
        dataBuf[4] = y & 0xFF;
        dataBuf[5] = (y >> 8) & 0xFF;
        dataBuf[6] = w & 0xFF;
        dataBuf[7] = (w >> 8) & 0xFF;
        dataBuf[8] = h & 0xFF;
        dataBuf[9] = (h >> 8) & 0xFF;
        dataBuf[10] = 0;  // 保留
        dataBuf[11] = 0;  // 保留
        
        // 设置颜色 (int32_t)
        dataBuf[12] = color & 0xFF;
        dataBuf[13] = (color >> 8) & 0xFF;
        dataBuf[14] = (color >> 16) & 0xFF;
        dataBuf[15] = (color >> 24) & 0xFF;

        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_DRAW_RECT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_DRAW_RECT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 绘制新矩形框
     * @param color 框的颜色
     * @param lineWidth 线宽
     * @param x 起点X坐标
     * @param y 起点Y坐标
     * @param w 宽度
     * @param h 高度
     */
    //% block="Draw new rectangle color%color Line width%lineWidth x%x y%y width%w height%h"
    //% subcategory="Screen Display"
    //% weight=89
    //% color.min=0 color.max=16777215
    //% lineWidth.min=1 lineWidth.max=10
    //% x.min=0 x.max=640
    //% y.min=0 y.max=480
    //% w.min=1 w.max=640
    //% h.min=1 h.max=480
    export function drawNewBox(color: number, lineWidth: number, x: number, y: number, w: number, h: number): void {
        const dataBuf = Buffer.create(16);
        dataBuf[0] = 0;  // 保留字节
        dataBuf[1] = lineWidth;  // 线宽
        
        // 设置坐标和尺寸 (int16_t)
        dataBuf[2] = x & 0xFF;
        dataBuf[3] = (x >> 8) & 0xFF;
        dataBuf[4] = y & 0xFF;
        dataBuf[5] = (y >> 8) & 0xFF;
        dataBuf[6] = w & 0xFF;
        dataBuf[7] = (w >> 8) & 0xFF;
        dataBuf[8] = h & 0xFF;
        dataBuf[9] = (h >> 8) & 0xFF;
        dataBuf[10] = 0;  // 保留
        dataBuf[11] = 0;  // 保留
        
        // 设置颜色 (int32_t)
        dataBuf[12] = color & 0xFF;
        dataBuf[13] = (color >> 8) & 0xFF;
        dataBuf[14] = (color >> 16) & 0xFF;
        dataBuf[15] = (color >> 24) & 0xFF;

        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_DRAW_UNIQUE_RECT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_DRAW_UNIQUE_RECT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 显示文字
     * @param color 文字颜色
     * @param fontSize 字体大小
     * @param x 起点X坐标
     * @param y 起点Y坐标
     * @param content 文字内容
     */
    //% block="Display text color%color fontSize%fontSize x%x y%y content%content"
    //% subcategory="Screen Display"
    //% weight=91
    //% color.min=0 color.max=16777215
    //% fontSize.min=8 fontSize.max=24
    //% x.min=0 x.max=640
    //% y.min=0 y.max=480
    export function showText(color: number, fontSize: number, x: number, y: number, content: string): void {
        const textBuf = Buffer.fromUTF8(content);
        const dataBuf = Buffer.create(15 + textBuf.length);
        
        dataBuf[0] = 0;  // 保留字节
        dataBuf[1] = fontSize;  // 字体大小
        
        // 设置坐标 (int16_t)
        dataBuf[2] = x & 0xFF;
        dataBuf[3] = (x >> 8) & 0xFF;
        dataBuf[4] = y & 0xFF;
        dataBuf[5] = (y >> 8) & 0xFF;
        
        // 保留字段
        dataBuf[6] = 0;  // 保留
        dataBuf[7] = 0;  // 保留
        dataBuf[8] = 0;  // 保留
        dataBuf[9] = 0;  // 保留
        
        // 文字长度
        dataBuf[10] = textBuf.length;
        
        // 文字内容
        for (let i = 0; i < textBuf.length; i++) {
            dataBuf[11 + i] = textBuf[i];
        }
        
        // 结束符和颜色
        dataBuf[11 + textBuf.length] = 0;  // 结束符
        
        // 设置颜色 (int32_t)
        dataBuf[12 + textBuf.length] = color & 0xFF;
        dataBuf[13 + textBuf.length] = (color >> 8) & 0xFF;
        dataBuf[14 + textBuf.length] = (color >> 16) & 0xFF;
        dataBuf[15 + textBuf.length] = (color >> 24) & 0xFF;

        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_DRAW_TEXT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_DRAW_TEXT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Clear text
     */
    //% block="Clear text"
    //% subcategory="Screen Display"
    //% weight=88
    export function clearText(): void {
        const dataBuf = Buffer.create(0);
        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_CLEAR_TEXT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_CLEAR_TEXT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Clear indicator boxes and rectangles
     */
    //% block="Clear indicator boxes and rectangles"
    //% subcategory="Screen Display"
    //% weight=87
    export function clearBoxes(): void {
        const dataBuf = Buffer.create(0);
        const pkt = PacketHead.fromFields({
            cmd: Macro.COMMAND_ACTION_CLEAR_RECT,
            algo_id: Algorithm.ALGORITHM_ANY,
            data: dataBuf,
        });

        // 发送命令并等待响应
        const maxRetries = 3;
        for (let i = 0; i < maxRetries; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(Macro.COMMAND_ACTION_CLEAR_RECT, Macro.COMMAND_RETURN_ARGS)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                const packetData = new PacketData(buf.slice(5, buf.length - 1));
                if (packetData.retValue === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * 设置RGB颜色值
     * @param red 红色值
     * @param green 绿色值
     * @param blue 蓝色值
     */
    //% block="set color red%red green%green blue%blue"
    //% subcategory="Screen Display"
    //% weight=86
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function setRGB(red: number, green: number, blue: number): number {
        // 限制输入值在0-255范围内
        red = Math.max(0, Math.min(255, red));
        green = Math.max(0, Math.min(255, green));
        blue = Math.max(0, Math.min(255, blue));
        
        // 将RGB值组合成一个32位整数 (0x00RRGGBB)
        return (red << 16) + (green << 8) + blue;
    }

}

    // ==================== End of Low-level Communication Code ====================