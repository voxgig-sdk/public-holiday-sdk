package = "voxgig-sdk-public-holiday"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/public-holiday-sdk.git"
}
description = {
  summary = "PublicHoliday SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["public-holiday_sdk"] = "public-holiday_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
