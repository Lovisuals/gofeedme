// ... (keep all previous content, only change the pool card part)

{pools.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {pools.map((pool) => (
      <div key={pool.id} className="relative">
        <PoolCard pool={pool} />
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <Button
            variant="secondary"
            className="bg-primary text-white hover:bg-primary-hover w-full max-w-xs"
            disabled={pool.slotsFilled >= pool.slotsTotal}
          >
            Join Pool
          </Button>
        </div>
      </div>
    ))}
  </div>
) : (
  // ... no pools card
)}
