package com.url_preview

import android.util.Log
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import org.jsoup.Jsoup
import org.jsoup.nodes.Document
import org.jsoup.nodes.Element

/**
 * UrlParseMeta
 *
 * <특징 및 역할>
 * 1. React Native 모듈로서 URL의 메타 데이터를 가져옴 (og:title, og:image, og:description, twitter:title 등)
 * 2. Jsoup 라이브러리를 사용하여 HTML head 태그에서 메타 태그를 파싱
 * 3. 별도의 Thread에서 실행되어 메인 스레드를 차단하지 않음
 * 4. 결과는 React Native로 Callback을 통해 전달
 */
class UrlParseMeta(context: ReactApplicationContext) : ReactContextBaseJavaModule(context) {

    companion object {
        // 모듈 이름 정의
        private const val MODULE_NAME = "UrlMetaModule"
    }

    // React Native에서 참조할 모듈 이름 반환
    override fun getName(): String = MODULE_NAME

    /**
     * URL 메타데이터를 파싱하는 메서드
     * @param url : 메타데이터를 가져올 URL
     * @param callback : React Native로 결과를 전달할 Callback
     */
    @ReactMethod
    fun parseMetaData(url: String?, callback: Callback?) {
        // URL이 비어있거나 callback이 null이면 종료
        if (url.isNullOrEmpty() || callback == null) return

        // 별도의 Thread에서 메타 파싱 실행
        ParseMetaThread(url, callback).start()
    }

    /**
     * 실제 메타 정보를 파싱하는 Thread 클래스
     */
    private class ParseMetaThread(
        private val url: String,
        private val callback: Callback
    ) : Thread() {

        /**
         * head 태그에서 지정한 메타 태그 값을 가져오는 함수
         * @param head : HTML head element
         * @param tag : 가져올 메타 태그 (image, title, description 등)
         * @return 메타 태그 content 값 (없으면 null)
         */
        private fun parseMeta(head: Element, tag: String): String? {
            return try {
                // og: 또는 twitter: 메타 태그 선택
                head.select("meta[property~=(og:$tag|twitter:$tag)]").first()?.attr("content")
            } catch (e: Exception) {
                Log.d(MODULE_NAME, "parse fail $tag from $url")
                null
            }
        }

        // Thread 실행 시 수행되는 코드
        override fun run() {
            try {
                // URL 접속 후 HTML 문서 가져오기
                val doc: Document? = Jsoup.connect(url).get()
                if (doc == null) return

                val head = doc.head() ?: return

                // 메타 태그 파싱
                val image = parseMeta(head, "image")
                val title = parseMeta(head, "title")
                val description = parseMeta(head, "description")

                // React Native로 결과 전달
                callback.invoke(image, title, description)
            } catch (e: NullPointerException) {
                callback.invoke(null, null, null)
                Log.d(MODULE_NAME, "cannot parse meta $url");
            } catch (e: Exception) {
                callback.invoke(null, null, null)
                Log.e(MODULE_NAME, "parse exception", e)
            }
        }
    }
}
