import Spline from '@splinetool/react-spline';

export default function Background() {
  return (
    <div className="fixed inset-0 w-full h-screen -z-10">
      <Spline
        scene="https://prod.spline.design/N75VaO0Xs46IQY4a/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
} 