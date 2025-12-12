/**
 * Custom graphic block
 */
//% weight=100 color=#0fbc11 icon="\uf067" block="HuskylensV2"
//% groups='["Communication","Algorithm Switch","Face Recognition","Object Recognition","Object Tracking","Color Recognition","Object Classification","Self-learning Classification","Instance Segmentation","Hand Recognition","Pose Recognition","License Plate Recognition","Optical Char Recognition","Line Tracking","Face Emotion Recognition","Tag Recognition","QR Code Recognition","Barcode Recognition"]'
namespace huskylensV2 {
    // MakeCode global types are automatically injected, these declarations are only to suppress IDE warnings
    // These declarations are not needed in the actual MakeCode compilation environment
    // ==================== Low-level Communication Code ====================
    export const I2CADDR = 0x50;
    export const COMMAND_KNOCK = 0x20
    export const COMMAND_GET_RESULT = 0x21
    export const COMMAND_GET_INFO = 0x22
    export const COMMAND_GET_RESULT_BY_ID = 0x23
    export const COMMAND_GET_BLOCKS_BY_ID = 0x24
    export const COMMAND_GET_ARROWS_BY_ID = 0x25
    export const COMMAND_GET_SENSOR_LIST = 0x26
    export const COMMAND_GET_RESULT_BY_INDEX = 0x27
    export const COMMAND_GET_BLOCKS_BY_INDEX = 0x28
    export const COMMAND_GET_ARROWS_BY_INDEX = 0x29

    export const COMMAND_SET_ALGORITHM = 0x30
    export const COMMAND_SET_NAME_BY_ID = 0x31
    export const COMMAND_SET_MULTI_ALGORITHM = 0x32
    export const COMMAND_SET_MULTI_ALGORITHM_RATIO = 0x33
    export const COMMAND_SET_LEARN_BLOCK_POSITION = 0x34

    export const COMMAND_RETURN_OK = 0x40
    export const COMMAND_RETURN_ERROR = 0x41
    export const COMMAND_RETURN_INFO = 0x42
    export const COMMAND_RETURN_BLOCK = 0x43
    export const COMMAND_RETURN_ARROW = 0x44
    export const COMMAND_RETURN_SENSOR_LIST = 0x45

    export const COMMAND_ACTION_TAKE_PHOTO = 0x50
    export const COMMAND_ACTION_TAKE_SCREENSHOT = 0x51
    export const COMMAND_ACTION_LEARN = 0x52
    export const COMMAND_ACTION_FORGOT = 0x53

    export const COMMAND_ACTION_SAVE_KNOWLEDGES = 0x54
    export const COMMAND_ACTION_LOAD_KNOWLEDGES = 0x55

    export const COMMAND_ACTION_DRAW_RECT = 0x56
    export const COMMAND_ACTION_CLEAN_RECT = 0x57
    export const COMMAND_ACTION_DRAW_TEXT = 0x58
    export const COMMAND_ACTION_CLEAR_TEXT = 0x59
    export const COMMAND_ACTION_PLAY_MUSIC = 0x5A

    export const ALGORITHM_ANY = 0
    export const ALGORITHM_FACE_RECOGNITION = 1
    export const ALGORITHM_OBJECT_TRACKING = 2
    export const ALGORITHM_OBJECT_RECOGNITION = 3
    export const ALGORITHM_LINE_TRACKING = 4
    export const ALGORITHM_COLOR_RECOGNITION = 5
    export const ALGORITHM_TAG_RECOGNITION = 6
    export const ALGORITHM_SELF_LEARNING_CLASSIFICATION = 7
    export const ALGORITHM_OCR_RECOGNITION = 8
    export const ALGORITHM_LICENSE_RECOGNITION = 9
    export const ALGORITHM_QRCODE_RECOGNITION = 10
    export const ALGORITHM_BARCODE_RECOGNITION = 11
    export const ALGORITHM_EMOTION_RECOGNITION = 12
    export const ALGORITHM_POSE_RECOGNITION = 13
    export const ALGORITHM_HAND_RECOGNITION = 14
    export const ALGORITHM_OBJECT_CLASSIFICATION = 15
    export const ALGORITHM_BLINK_RECOGNITION = 16
    export const ALGORITHM_GAZE_RECOGNITION = 17
    export const ALGORITHM_FACE_ORIENTATION = 18
    export const ALGORITHM_FALLDOWN_RECOGNITION = 19
    export const ALGORITHM_SEGMENT = 20
    export const ALGORITHM_FACE_ACTION_RECOGNITION = 21
    export const ALGORITHM_CUSTOM0 = 22
    export const ALGORITHM_CUSTOM1 = 23
    export const ALGORITHM_CUSTOM2 = 24
    export const ALGORITHM_BUILTIN_COUNT = 25
    export const ALGORITHM_CUSTOM_BEGIN = 128

    export const FRAME_BUFFER_SIZE = 128
    export const MAX_RESULT_NUM = 6
    export const CMD_BUFFER_SIZE = 32
    export const LCD_WIDTH = 640
    export const LCD_HEIGHT = 480

    export const HEADER_0_INDEX = 0
    export const HEADER_1_INDEX = 1
    export const COMMAND_INDEX = 2
    export const ALGO_INDEX = 3
    export const CONTENT_SIZE_INDEX = 4
    export const CONTENT_INDEX = 5
    export const PROTOCOL_SIZE = 6

    export const ALGORITHM_COUNT = ALGORITHM_BUILTIN_COUNT
    export const CUSTOM_ALGORITHM_COUNT = 3

    export const timeOutDuration = 2000

    export  function checksum(buf: Buffer): number {
        let sum = 0;
        for (let i = 0; i < buf.length; i++) {
            sum = (sum + buf[i]) & 0xFF;
        }
        return sum;
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

            const cs = checksum(buf.slice(0, PacketHead.HEADER_SIZE + total_length - 1));
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

            const cs = checksum(buf);
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

        get ID() { return this.buffer[0] }
        set ID(v: number) { this.buffer[0] = v & 0xff; }

        get maxID() { return this.buffer[0] }
        set maxID(v: number) { this.buffer[0] = v & 0xff; }

        get rfu0() { return this.buffer[0] }
        set rfu0(v: number) { this.buffer[0] = v & 0xff; }

        get boardType() { return this.buffer[0] }
        set boardType(v: number) { this.buffer[0] = v & 0xff; }

        get totalSensors() { return this.buffer[0] }
        set totalSensors(v: number) { this.buffer[0] = v & 0xff; }

        get multiAlgoNum() { return this.buffer[0] }
        set multiAlgoNum(v: number) { this.buffer[0] = v & 0xff; }

        get rfu1() { return this.buffer[1]; }
        set rfu1(v: number) { this.buffer[1] = v & 0xff; }

        get level() { return this.buffer[1]; }
        set level(v: number) { this.buffer[1] = v & 0xff; }

        get confidence() { return this.buffer[1]; }
        set confidence(v: number) { this.buffer[1] = v & 0xff; }

        get currSensorIndex() { return this.buffer[1]; }
        set currSensorIndex(v: number) { this.buffer[1] = v & 0xff; }

        get first() { return this.buffer[2] + this.buffer[3] * 256; }
        set first(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get xCenter() { return this.buffer[2] + this.buffer[3] * 256; }
        set xCenter(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get xTarget() { return this.buffer[2] + this.buffer[3] * 256; }
        set xTarget(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get algorithmType() { return this.buffer[2] + this.buffer[3] * 256; }
        set algorithmType(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get classID() { return this.buffer[2] + this.buffer[3] * 256; }
        set classID(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get sensor0ID() { return this.buffer[2] + this.buffer[3] * 256; }
        set sensor0ID(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get total_results() { return this.buffer[2] + this.buffer[3] * 256; }
        set total_results(v: number) { this.buffer[2] = v & 0xff; this.buffer[3] = (v >> 8) & 0xff; }

        get second() { return this.buffer[4] + this.buffer[5] * 256; }
        set second(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get yCenter() { return this.buffer[4] + this.buffer[5] * 256; }
        set yCenter(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get yTarget() { return this.buffer[4] + this.buffer[5] * 256; }
        set yTarget(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get sensor1ID() { return this.buffer[4] + this.buffer[5] * 256; }
        set sensor1ID(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get total_results_learned() { return this.buffer[4] + this.buffer[5] * 256; }
        set total_results_learned(v: number) { this.buffer[4] = v & 0xff; this.buffer[5] = (v >> 8) & 0xff; }

        get third() { return this.buffer[6] + this.buffer[7] * 256; }
        set third(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get width() { return this.buffer[6] + this.buffer[7] * 256; }
        set width(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get angle() { return this.buffer[6] + this.buffer[7] * 256; }
        set angle(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get sensor2ID() { return this.buffer[6] + this.buffer[7] * 256; }
        set sensor2ID(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get total_blocks() { return this.buffer[6] + this.buffer[7] * 256; }
        set total_blocks(v: number) { this.buffer[6] = v & 0xff; this.buffer[7] = (v >> 8) & 0xff; }

        get fourth() { return this.buffer[8] + this.buffer[9] * 256; }
        set fourth(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get height() { return this.buffer[8] + this.buffer[9] * 256; }
        set height(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get length() { return this.buffer[8] + this.buffer[9] * 256; }
        set length(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

        get total_blocks_learned() { return this.buffer[8] + this.buffer[9] * 256; }
        set total_blocks_learned(v: number) { this.buffer[8] = v & 0xff; this.buffer[9] = (v >> 8) & 0xff; }

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

    export class FaceResult extends Result {
        leye_x: number = 0; leye_y: number = 0;
        reye_x: number = 0; reye_y: number = 0;
        nose_x: number = 0; nose_y: number = 0;
        lmouth_x: number = 0; lmouth_y: number = 0;
        rmouth_x: number = 0; rmouth_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];

            let offset = 12 + content_length + name_length;

            this.leye_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.leye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.nose_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.nose_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lmouth_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lmouth_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rmouth_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rmouth_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    export class HandResult extends Result {
        wrist_x: number = 0; wrist_y: number = 0;
        thumb_cmc_x: number = 0; thumb_cmc_y: number = 0;
        thumb_mcp_x: number = 0; thumb_mcp_y: number = 0;
        thumb_ip_x: number = 0; thumb_ip_y: number = 0;
        thumb_tip_x: number = 0; thumb_tip_y: number = 0;
        index_finger_mcp_x: number = 0; index_finger_mcp_y: number = 0;
        index_finger_pip_x: number = 0; index_finger_pip_y: number = 0;
        index_finger_dip_x: number = 0; index_finger_dip_y: number = 0;
        index_finger_tip_x: number = 0; index_finger_tip_y: number = 0;
        middle_finger_mcp_x: number = 0; middle_finger_mcp_y: number = 0;
        middle_finger_pip_x: number = 0; middle_finger_pip_y: number = 0;
        middle_finger_dip_x: number = 0; middle_finger_dip_y: number = 0;
        middle_finger_tip_x: number = 0; middle_finger_tip_y: number = 0;
        ring_finger_mcp_x: number = 0; ring_finger_mcp_y: number = 0;
        ring_finger_pip_x: number = 0; ring_finger_pip_y: number = 0;
        ring_finger_dip_x: number = 0; ring_finger_dip_y: number = 0;
        ring_finger_tip_x: number = 0; ring_finger_tip_y: number = 0;
        pinky_finger_mcp_x: number = 0; pinky_finger_mcp_y: number = 0;
        pinky_finger_pip_x: number = 0; pinky_finger_pip_y: number = 0;
        pinky_finger_dip_x: number = 0; pinky_finger_dip_y: number = 0;
        pinky_finger_tip_x: number = 0; pinky_finger_tip_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];
            let offset = 12 + content_length + name_length;

            this.wrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.wrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_cmc_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_cmc_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_ip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_ip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.thumb_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.index_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.middle_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.ring_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_mcp_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_mcp_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_pip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_pip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_dip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_dip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_tip_x = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.pinky_finger_tip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    export class PoseResult extends Result {
        nose_x: number = 0; nose_y: number = 0;
        leye_x: number = 0; leye_y: number = 0;
        reye_x: number = 0; reye_y: number = 0;
        lear_x: number = 0; lear_y: number = 0;
        rear_x: number = 0; rear_y: number = 0;
        lshoulder_x: number = 0; lshoulder_y: number = 0;
        rshoulder_x: number = 0; rshoulder_y: number = 0;
        lelbow_x: number = 0; lelbow_y: number = 0;
        relbow_x: number = 0; relbow_y: number = 0;
        lwrist_x: number = 0; lwrist_y: number = 0;
        rwrist_x: number = 0; rwrist_y: number = 0;
        lhip_x: number = 0; lhip_y: number = 0;
        rhip_x: number = 0; rhip_y: number = 0;
        lknee_x: number = 0; lknee_y: number = 0;
        rknee_x: number = 0; rknee_y: number = 0;
        lankle_x: number = 0; lankle_y: number = 0;
        rankle_x: number = 0; rankle_y: number = 0;

        constructor(buf: Buffer) {
            super(buf);
            let name_length = buf[10];
            let content_length = buf[11 + name_length];
            let offset = 12 + content_length + name_length;

            this.nose_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.nose_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.leye_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.leye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.reye_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.reye_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lear_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lear_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rear_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rear_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lshoulder_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lshoulder_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rshoulder_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rshoulder_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lelbow_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lelbow_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.relbow_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.relbow_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lwrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lwrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rwrist_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rwrist_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lhip_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lhip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rhip_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rhip_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lknee_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lknee_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rknee_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rknee_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.lankle_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.lankle_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
            this.rankle_x = buf[offset] + buf[offset + 1] * 256; offset += 2; this.rankle_y = buf[offset] + buf[offset + 1] * 256; offset += 2;
        }
    }

    let retry = 3
    let maxID: number[] = [];
    for (let i = 0; i < ALGORITHM_COUNT; i++) {
        maxID.push(0);
    }
    let timeOutTimer = 0
    // Use loop to initialize array to ensure ES5 compatibility
    let i2c_cached_data: number[] = []
    let receive_buffer: number[] = [];
    for (let i = 0; i < FRAME_BUFFER_SIZE; i++) {
        receive_buffer.push(0);
    }
    let receive_index = 0

    export function timerBegin() { timeOutTimer = control.millis(); }
    export function timerAvailable(): boolean {
        return (control.millis() - timeOutTimer > timeOutDuration);
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
        let response = pins.i2cReadBuffer(I2CADDR, 32);
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
            case HEADER_0_INDEX:
                if (data != 0x55) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[HEADER_0_INDEX] = 0x55;
                break;
            case HEADER_1_INDEX:
                if (data != 0xaa) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[HEADER_1_INDEX] = 0xaa;
                break;
            case COMMAND_INDEX:
                receive_buffer[COMMAND_INDEX] = data;
                break;
            case ALGO_INDEX:
                receive_buffer[ALGO_INDEX] = data;
                break;
            case CONTENT_SIZE_INDEX:
                if (receive_index >= FRAME_BUFFER_SIZE - PROTOCOL_SIZE) {
                    receive_index = 0;
                    return false;
                }
                receive_buffer[CONTENT_SIZE_INDEX] = data;
                break;
            default:
                receive_buffer[receive_index] = data;
                let expectedLen = receive_buffer[CONTENT_SIZE_INDEX] + CONTENT_INDEX;
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
        let stackSumIndex = receive_buffer[CONTENT_SIZE_INDEX] + CONTENT_INDEX;
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
        while (!timerAvailable()) {
            if (protocolAvailable()) {
                let receivedCmd = receive_buffer[COMMAND_INDEX];
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
        pins.i2cWriteBuffer(I2CADDR, buffer);
    }

    export function beginInternal(): boolean {
        const dataBuf = Buffer.create(10);
        dataBuf[0] = 1;
        const pkt = PacketHead.fromFields({
            cmd: COMMAND_KNOCK,
            algo_id: ALGORITHM_ANY,
            data: dataBuf,
        });

        for (let i = 0; i < 3; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(COMMAND_KNOCK, COMMAND_RETURN_OK)) {
                return true;
            }
        }
        return false;
    }

    export function switchAlgorithmInternal(algo: number): boolean {
        const dataBuf = Buffer.create(10);
        dataBuf[0] = algo;
        const pkt = PacketHead.fromFields({
            cmd: COMMAND_SET_ALGORITHM,
            algo_id: ALGORITHM_ANY,
            data: dataBuf,
        });

        for (let i = 0; i < 3; i++) {
            protocolWrite(pkt);
            basic.pause(100);
            if (wait(COMMAND_SET_ALGORITHM, COMMAND_RETURN_OK)) {
                return true;
            }
        }
        return false;
    }

    export type ResultVariant = Result | FaceResult | HandResult | PoseResult | null;
    let result: ResultVariant[][] = [];
    for (let i = 0; i < ALGORITHM_COUNT; i++) {
        result[i] = [];
        for (let j = 0; j < MAX_RESULT_NUM; j++) {
            result[i][j] = null;
        }
    }
    let customId: number[] = [ALGORITHM_ANY, ALGORITHM_ANY, ALGORITHM_ANY];

    export function toRealID(id: number): number {
        let algo = id;
        if (id >= ALGORITHM_CUSTOM_BEGIN) {
            for (let i = 0; i < CUSTOM_ALGORITHM_COUNT; i++)
                if (customId[i] == algo) {
                    algo = (ALGORITHM_CUSTOM0 + i);
                    break;
                }
        }
        return algo;
    }

    export function availableInternal(algo: number): boolean {
        let ret = false;
        algo = toRealID(algo);

        for (let i = 0; i < MAX_RESULT_NUM; i++) {
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
        algo = toRealID(algo);
        return maxID[algo] || 0;
    }

    export function getResultInternal(algo: number): number {
        const dataBuf = Buffer.create(0);
        let pkt = PacketHead.fromFields({
            cmd: COMMAND_GET_RESULT,
            algo_id: algo,
            data: dataBuf,
        });

        let i = 0
        let _count = 0
        let info = new PacketData(Buffer.create(10));
        algo = toRealID(algo);
        for (i = 0; i < MAX_RESULT_NUM; i++) {
            result[algo][i] = null;
        }
        for (i = 0; i < retry; i++) {
            protocolWrite(pkt)
            if (wait(COMMAND_GET_RESULT, COMMAND_RETURN_INFO)) {
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                info = new PacketData(buf.slice(5, buf.length - 1));
                maxID[algo] = info.maxID;
                if (info.total_results > MAX_RESULT_NUM) {
                    info.total_results = MAX_RESULT_NUM;
                }
                if (info.total_blocks > MAX_RESULT_NUM) {
                    info.total_blocks = MAX_RESULT_NUM;
                }
                break;
            }
        }
        if (i == retry) {
            return -1;
        }
        for (i = 0; i < info.total_blocks; i++) {
            if (wait(0, COMMAND_RETURN_BLOCK)) {
                _count++;
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                let dataBuf = buf.slice(5, buf.length - 1);
                if (algo == ALGORITHM_FACE_RECOGNITION) {
                    result[algo][i] = new FaceResult(dataBuf);
                } else if (algo == ALGORITHM_HAND_RECOGNITION) {
                    result[algo][i] = new HandResult(dataBuf);
                } else if (algo == ALGORITHM_POSE_RECOGNITION) {
                    result[algo][i] = new PoseResult(dataBuf);
                } else {
                    result[algo][i] = new Result(dataBuf);
                }
            }
        }
        for (i = info.total_blocks; i < info.total_results; i++) {
            if (wait(0, COMMAND_RETURN_ARROW)) {
                _count++;
                let buf = Buffer.create(receive_buffer.length);
                for (let j = 0; j < receive_buffer.length; j++) {
                    buf[j] = receive_buffer[j];
                }
                result[algo][i] = new Result(buf.slice(5, buf.length - 1));
            }
        }
        return _count;
    }

    export function getCachedCenterResultInternal(algo: number): ResultVariant | null {
        algo = toRealID(algo);
        let centerIndex = -1;
        let minLen = 999999999;
        for (let i = 0; i < MAX_RESULT_NUM; i++) {
            const r = result[algo][i];
            if (r) {
                const res = r as Result;
                const len = (res.xCenter - LCD_WIDTH / 2) ** 2 +
                    (res.yCenter - LCD_HEIGHT / 2) ** 2;
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
        algo = toRealID(algo);

        if (index >= MAX_RESULT_NUM) {
            return null;
        }
        return result[algo][index];
    }

    export function getCachedResultByIDInternal(algo: number, ID: number): ResultVariant | null {
        algo = toRealID(algo);

        for (let i = 0; i < MAX_RESULT_NUM; i++) {
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
        algo = toRealID(algo);

        for (let i = 0; i < MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                count++;
            }
        }
        return count;
    }

    export function getCachedResultLearnedNumInternal(algo: number): number {
        algo = toRealID(algo);
        return getCachedResultMaxID(algo);
    }

    export function getCachedResultNumByIDInternal(algo: number, ID: number): number {
        let count = 0;
        algo = toRealID(algo);

        for (let i = 0; i < MAX_RESULT_NUM; i++) {
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
        algo = toRealID(algo);
        for (let i = 0; i < MAX_RESULT_NUM; i++) {
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
        algo = toRealID(algo);

        const item = result[algo] && result[algo][0];

        if (item && item.level === 1) {
            return item;
        }

        return null;
    }

    export function getUpcomingBranchCountInternal(algo: number): number {
        let count = 0;
        algo = toRealID(algo);

        for (let i = 0; i < MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                count++;
            }
        }
        return count > 0 ? count - 1 : 0;
    }

    export function getBranchInternal(algo: number, index: number): ResultVariant | null {
        let rlt: ResultVariant | null = null;
        index++;
        algo = toRealID(algo);

        for (let i = 1; i < MAX_RESULT_NUM; i++) {
            if (result[algo][i] != null) {
                if (i == index) {
                    rlt = result[algo][i];
                    break;
                }
            }
        }
        return rlt;
    }
}

    // ==================== End of Low-level Communication Code ====================