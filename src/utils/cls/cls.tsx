
type ConditionalClassName = [string, boolean];

type Cls = string | ConditionalClassName | undefined | null;
export default function cls(...classes: Cls[]): string {
    return classes
        .map(className => !Array.isArray(className)
            ? className
            : className[1]
                ? className[0]
                : null
        )
        .filter(Boolean)
        .join(' ');
}