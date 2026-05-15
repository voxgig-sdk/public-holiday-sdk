# PublicHoliday SDK utility: feature_add
module PublicHolidayUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
