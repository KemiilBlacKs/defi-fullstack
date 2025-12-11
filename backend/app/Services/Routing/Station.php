<?php

namespace App\Services\Routing;

readonly class Station
{
    public function __construct(
        public int $id,
        public string $shortName,
        public string $longName,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            id: $data['id'],
            shortName: $data['shortName'],
            longName: $data['longName'],
        );
    }
}
