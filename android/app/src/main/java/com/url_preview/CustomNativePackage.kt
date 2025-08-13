package com.url_preview

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * CustomNativePackage
 *
 * <특징 및 역할>
 * 1. React Native에 커스텀 네이티브 모듈 등록
 * 2. UrlParseMeta 모듈을 React Native에서 사용할 수 있도록 연결
 * 3. ViewManager는 등록하지 않음
 */
class CustomNativePackage : ReactPackage {

    // React Native에서 사용할 네이티브 모듈 리스트 반환
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(UrlParseMeta(reactContext))
    }

    // React Native에서 사용할 ViewManager 리스트 반환 (없으면 빈 리스트)
    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList()
    }
}
