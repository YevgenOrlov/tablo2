if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/Admin/.gradle/caches/8.10.2/transforms/3952b6835f47afc657a301b9fd088ddb/transformed/hermes-android-0.76.9-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/Admin/.gradle/caches/8.10.2/transforms/3952b6835f47afc657a301b9fd088ddb/transformed/hermes-android-0.76.9-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

