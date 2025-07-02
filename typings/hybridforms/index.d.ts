declare global {
    interface String {
        htmlEncode(): string;
        format(...args: (string | number)[]): string;
        toHHMMSS(): string;
        eq(toCompare: string): boolean;
    }

    interface Date {
        formatDateTime(culture?: string, dateformat?: string): string;
        formatTime(hour12Format?: boolean, format?: string): string;
        formatDate(dateformat: string, culture?: string): string;
    }

    interface Number {
        roundTo(decimalPlaces: number): number;
    }

    interface RegExpConstructor {
        escape(s: string): string;
    }
}

export {};
